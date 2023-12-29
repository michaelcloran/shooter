# [Table of contents](#top)<br>
-1. [Shooter Overview](#1-shooter-overview)<br>

-2. [Existing Features](#2-existing-features)<br>
- [Favicon](#favicon)<br>
- [The Landing Page](#landing-page)<br>
- [The Game Playing Area](#the-game-playing-area)<br>
- [The Game Over Page](#game-over-page")<br>
- [The 404 Error Page](#404-error-page)<br>
- [Features left to implement](#features-left-to-implement)<br>
	


-3. [Wireframes](#3-wireframes)
 - [Wireframe Landing Page](#index-landing-page)<br>
 - [Main Game playing area](#wireframe-main-game-playing-area)<br>
- [Game over page](#wireframe-game-over-page)<br>
- [404 Page](#wireframe-404-page)<br>

-4. [Technologies](#4-technologies)<br>
- HTML<br>
- CSS<br>
- JavaScript<br>
- Git<br>
- GitHub<br>
- Balsamiq<br>
- Apache2 sandbox<br>
- Favicon.io<br>
- CraftPix<br>
- VSCodium on Ubuntu Linux<br>


-5. [Testing](#testing)<br>
   - [Accessibility](#accessibility)<br>
   - [Lighthouse testing](#lighthouse-testing)<br>
    - [Desktop](#desktop)<br>
    - [Mobile](#mobile)<br>
   - [Functional tests](#functional-tests)<br>
   - [Validation of code](#validation-of-code)<br>
    - [CSS](#css)<br>
    - [HTML](#html)<br>
    - [JavaScript](#javascript)<br>

-6. [Deployment](#6-deployment)<br>
-7. [Credits](#7-credits)<br>

<hr>
<p align="right">
    <a href="#top" >Goto Top</a>
</p>


## 1. Shooter Overview

This project is about a simple 2D shooter game written in JavaScript with HTML and CSS. Link to online website: https://michaelcloran.github.io/shooter/index.html
<hr>
<p align="right">
    <a href="#top" >Goto Top</a>
</p>

## 2. Existing Features
- Favicon<br>
The favicon is a fun icon to show in the browser tabs to quickly identify the Shooter webpage.<br>
![Screenshot](assets/readme_images/favicon.png)<br>

- The Landing Page<br>
![Screenshot](assets/readme_images/landing-page.png)<br>

- The Game Playing Area<br>Notice the two buttons play sound and pause sound. These buttons are used to play and stall background music.<br>
![Screenshot](assets/readme_images/game-playing-area.png)<br>

- The Game Over Page<br>
![Screenshot](assets/readme_images/game-over-page.png)<br>

- The 404 Error Page<br>
![Screenshot](assets/readme_images/404_page.png)<br>

- Features left to implement<br>
The game works well but I have not implemented powerups which would be like boxes which could be shot with current code and if shot it adds to credits of the player.
The game when used on a mobile if you do a touch screen select and move gesture then the controls get a little confused. I am currently unsure how to fix this gesture. If the buttons are clicked the ship can move left and right and shoot. I have chosen to have the player continually scroll left or right as with buttons it hard to continually click the button and move!!.
<hr>
<p align="right">
    <a href="#top" >Goto Top</a>
</p>

## 3. Wireframes

### Index Landing page

![Screenshot](assets/readme_images/welcome-desktop.png)<br>
Above shows the landing page for a Desktop.

![Screenshot](assets/readme_images/welcome-mobile.png)<br>
Above shows a landing page for a mobile device.
<hr>
<p align="right">
    <a href="#top" >Goto Top</a>
</p>

### Wireframe Main Game Playing Area

![Screenshot](assets/readme_images/main-game-playingarea-desktop.png)<br>

Above shows game for Desktop.

![Screenshot](assets/readme_images/main-game-playingarea-mobile.png)<br>

Above shows the game for a mobile device.

<hr>
<p align="right">
    <a href="#top" >Goto Top</a>
</p>

### Wireframe game over page

![Screenshot](assets/readme_images/game-over-desktop.png)<br>

Above shows the Game Over page for a Desktop.

![Screenshot](assets/readme_images/game-over-mobile.png)<br>

Above shows the game over screen for a mobile device.

<hr>
<p align="right">
    <a href="#top" >Goto Top</a>
</p>

### Wireframe 404 page 

![Screenshot](assets/readme_images/404-page.png)<br>


Above shows the 404 not found screen for mobile and Desktop. It redirects to the landing page after 10 seconds.
<hr>
<p align="right">
    <a href="#top" >Goto Top</a>
</p>

## 4. Technologies
- HTML<br>
HTML was the markup used for the site.
- CSS<br>
CSS was used to do some basic styling.
- JavaScript<br>
- Git<br>
Git was used.
- GitHub<br>
The repo is held on GitHub.
- Balsamiq<br>
The wireframes were done by Balsamiq.
- Apache2 sandbox<br>
I used a sandbox which was Apache 2.
- Favicon.io<br>
I got the fun browser icon from https://favicon.io/favicon-generator/
- CraftPix<br> 
I went to website craftpix.net and done a search for space and found a free image pack. Then I unzipped it into my Code Institute folder for PP2 and found 4 folders with images within each.1. PSD for fighter , bomber and corvette spritelist. 2. Fighter with a individual sprite list per state for eg Damage, destroyed, turn_2, turn_1, Attack_2, Attack_1, Boost, Move, Idle, Charge 1 and 2. The other 2 folders are for Bomber and Corvette space ships. The game pack came with a lot of images. I am going to go for minimum viable project MVP first and then add based on time!!.
- VSCodium on Ubuntu Linux<br>

<hr>
<p align="right">
    <a href="#top" >Goto Top</a>
</p>

## 5. Testing<br>
- Accessibility<br>
- Lighthouse testing<br>
- Desktop<br>
- Mobile<br>
- Functional tests<br>
- Validation of code<br>
- CSS<br>
- HTML<br>
- JavaScript<br>

<hr>
<p align="right">
    <a href="#top" >Goto Top</a>
</p>

## 6. Deployment

For Deployment I setup the project/repo folder shooter on GitHub with template 
from Code Institute<br>

opened terminal went to document Root of the Apache 2 webserver sandbox<br>
git clone  https://github.com/michaelcloran/shooter<br>
Cloning into 'shooter'... etc<br>
cd shooter<br>
in another terminal window<br>
cd /home/michael/.ssh<br>
ssh-keygen -t ed25519 -C "michaelcloran2010@gmail.com"<br>
asked for passphrase entered it<br>
more id_ed25519_shooter.pub<br>
from screen dump copied over into<br>
on GitHub went to settings deploy keys<br>
in text area copied over key with title shooter<br>
went back to terminal /home/michael/.ssh/ ran more config<br>
<br>
edited config added<br>
#shooter account pp2 code institute<br>
Host github.com-shooter<br>
HostName github.com<br>
ForwardAgent yes<br>
User git<br>
IdentityFile ~/.ssh/id_ed25519_shooter<br>
IdentitiesOnly yes<br>
from documentroot of web server and then cd into cloned shooter directory ran<br>
git remote set-url  origin git+ssh://git@github.com-shooter:/michaelcloran/shooter.git<br>
then ran<br>
ssh-add ~/.ssh/id_ed25519_shooter<br>
had to give passphrase but this should be the only time till i logout and then I have <br>
todo ssh-add ~/.ssh/id_ed25519_shooter again<br>
<br>
then edited Read.md<br>
git add .<br>
git commit -m "docs initial commit"<br>
git push<br>
Things are now setup for development<br>

### To deploy a live website

I went to GitHub logged in choose repo Shooter and clicked on settings
and then pages. I then clicked on source delpoy from branch and branch
from dropdown choose main and root and clicked on save.

<hr>
<p align="right">
    <a href="#top" >Goto Top</a>
</p>


## 7. Credits
- W3schools.com: https://www.w3schools.com/graphics/game_intro.asp <br>
I used this tutorial to build the game engine from scratch.
- Balsamiq<br>
I used Balsamiq to do mockup wireframes.

- resize of images with canvas context
https://stackoverflow.com/questions/19262141/resize-image-with-javascript-canvas-smoothly <br>
I used the above to give me ideas on how to resize the images for mobile and small screen usage.

- Awesome laser sound: https://pixabay.com/sound-effects/search/laser/
- sound track background: https://cdn.pixabay.com/
- YouTube Space Invaders tutorial: https://www.youtube.com/watch?v=MCVU0w73uKI
- Book used as reference: 2D Game Collision Detection, An introduction to clashing geometry in games by Thomas Schwarzl.
<hr>
<p align="right">
    <a href="#top" >Goto Top</a>
</p>

