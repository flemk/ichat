function getText(url) {
    // read text from URL location
    var request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send(null);
    var response = request.responseText;
    return response.split('\\').join('\\\\');
}

function sendPost(url, params) {
    var request = new XMLHttpRequest();
    //var params = 'lorem=ipsum&name=binny';
    request.open('POST', url, true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200) {}
    }
    request.send(params);
}

function createPeer(id, id_to, initiator) {
    var ccount = false;
    var inbox_old = ['_', '_'];
    console.log('init: ' + initiator);

    const p = new SimplePeer({
        initiator: initiator,
        trickle: false
    })

    p.on('error', err => console.log('error', err))

    // [!] outgoing:
    p.on('signal', data => {
        console.log('READY SIGNAL', JSON.stringify(data));
        var post_data = 'id=' + id + '&type=message' + '&message=[\'' + id + '\',\'' + JSON.stringify(data) + '\']' + '&file=' + id_to + '_inbox.txt';
        if (post_data.includes('answer') || post_data.includes('offer') || post_data.includes('renegotiate')) {
            console.log('SENDING SIGNAL', JSON.stringify(data));
            sendPost('http://127.0.0.1/lander/room/write.php', post_data);
        }
    })

    // [!] incoming
    var cycle = setInterval(function(){
        var inbox = eval(getText('http://127.0.0.1/lander/room/' + id + '_inbox.txt'));
        if (inbox[0] == id_to && inbox[1] != inbox_old[1]) {
            p.signal(JSON.parse(inbox[1]));
            console.log('RECEIVING SIGNAL', inbox[1]);
        }
        inbox_old = inbox;
    }, 500);

    p.on('error', (err) => {
        //second attempt: destroy peer, return new.
        //p.destroy();
        //return createPeer(id, id_to, initiator);
        console.log('ERROR', err);
        clearInterval(cycle);
    });

    p.on('connect', () => {
        console.log('CONNECT')
        p.send('whatever' + Math.random())
        clearInterval(cycle);
    })

    p.on('data', data => {
        console.log('DATA: ' + data)
    })

    function addMedia(stream) {
        p.addStream(stream);
    }
    navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    }).then(addMedia).catch(() => {})

    return p;
}