>:warning: **massive security risks!**
>
>Using `write.php` it is possible for attackers to takeover your filesystem.

==This project is not finished yet. The p2p connection can not be enabled stable. This is to be done in the next step.==

# ichat 
###### Distance dependent dynamic immersive voice and video chat 

Currently video and voice chats are not very friendly for groups to hang out together. This is mainly because only one person can talk at once. Everyone in the conversation can hear everyone, even if they are not meant to.

So how do you control, that only certain users can hear you, but others in the same chatroom can not hear you, unless they move in? The same applies  for seeing your video image.

So, I've created a game, where you can control a dot on a 2D plane. Other dots represent other users in the same chatroom. You can only hear those users, whose dots are in a given range of your dot. The same can be applied for video images.

## Future
- [ ] Redesign `/room/write.php` for improving security. this contains register and message function.
- [ ] Redesign connection algorithm: Currently it's not very stable.
- [ ] Implement *the game* and distance dependent volume control.