# [Table of contents](#top)<br>
-1. [Shooter Overview](#1-shooter-overview)<br>

-2. [Existing Features](#existing-features)<br>
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
- [HTML](#html)<br>
- [CSS](#css)<br>
- [JavaScript](#javascript)<br>
- [Git](#git)<br>
- [GitHub](#github)<br>
- [Balsamiq](#balsamiq)<br>
- [Apache2 sandbox](#apache2)<br>
- [Favicon.io](#favicon)<br>
- [CraftPix](#craftpix)<br>
- [VSCodium on Ubuntu Linux](#vscode)<br>


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

-6. [Deployment](#deployment)<br>
-7. [Credits](#credits)<br>

<hr>
<p align="right">
    <a href="#top" >Goto Top</a>
</p>
<br>
<br>
<br>
<br>
<br>
<br>
<br>






















## 1. Shooter Overview

This project is about a simple 2D shooter game written in JavaScript with HTML and CSS. Link to online website HERE todo
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
- CSS<br>
- JavaScript<br>
- Git<br>
- GitHub<br>
- Balsamiq<br>
- Apache2 sandbox<br>
- Favicon.io<br>
- CraftPix<br> I went to website craftpix.net and done a search for space and found a free image pack. Then I unzipped it into my Code Institute folder for PP2 and found 4 folders with images within each.1. PSD for fighter , bomber and corvette spritelist. 2. Fighter with a individual sprite list per state for eg Damage, destroyed, turn_2, turn_1, Attack_2, Attack_1, Boost, Move, Idle, Charge 1 and 2. The other 2 folders are for Bomber and Corvette space ships. The game pack came with a lot of images. I am going to go for minimum viable project MVP first and then add based on time!!.
- VSCodium on Ubuntu Linux<br>

## Deployment

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


## Credits
W3schools.com
Balsamiq

resize of images with canvas context
https://stackoverflow.com/questions/19262141/resize-image-with-javascript-canvas-smoothly

<hr>
<p align="right">
    <a href="#top" >Goto Top</a>
</p>

