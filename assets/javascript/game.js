//Containing array, makes characters easy to manage
var starWarsCharacters = [];

//Empty array for the enemies, fills after user selects their character
var enemiesArray = [];

// Track if the game is over or not
var gameOver = false;

// These keep track of the two attacking characters
var defendingCharacter;
var userCharacter;

class Jedi {
  //object template for jedi
  constructor(name, src, health, baseAttack, counterAttack) {
    this.name = name;
    this.health = health;
    this.baseAttack = baseAttack;
    this.currentAttack = this.baseAttack;
    this.counterAttack = counterAttack;
    this.src = src;
    this.createElement()
  }
  createElement() {
    //jedi element creation for html
    //container element
    this.element = $("<button>");
    this.element.addClass(" col-3 card heroBox");
    this.element.attr("value", this.name);
    //character title
    this.title = $("<h3>");
    this.title.text(this.name);
    this.title.addClass("heroT card-header w-100");
    this.element.append(this.title);
    //image placement
    this.image = $("<img>");
    this.image.attr("src", this.src);
    this.image.attr("alt", this.name);
    this.image.attr("style", "height: 150px; width: 200px")
    this.image.addClass("pic card-image-top");
    this.element.append(this.image);
    //text content holder
    this.content = $("<div>");
    this.content.addClass("card-body");
    this.element.append(this.content);
    //character status
    this.status = $("<h4>");
    this.status.addClass("heroS");
    this.status.text("health: " + this.health);
    this.content.append(this.status)
  }
  updateStatus() {
    this.status.text("health: " + this.health);
  }
}

$(document).ready(function () {

    // Create Characters, each is class Jedi
    var obi = new Jedi("Obi-Wan Kenobi", "assets/images/obi.jpg", 120, 6, 20);
    var anakin = new Jedi("Anakin Skywalker", "assets/images/anakin.jpg", 100, 7, 30);
    var emperor = new Jedi("Sheev Palpatine", "assets/images/emperor.jpg", 150, 8, 40);
    var grievous = new Jedi("General Grievous", "assets/images/grievous.jpg", 180, 9, 50);

    starWarsCharacters = [obi, anakin, emperor, grievous];

    //Add characters to character array
    for (var i = 0; i < starWarsCharacters.length; i++)
    {
        $("#character-space").append(starWarsCharacters[i].element)
    }

    //Set up click listener to click on a character card.  This selects the player's character
    $(".card").click(function(event) {
        // console.log("Clicked a jedi");
        console.log(event.currentTarget.parentElement.id );
        console.log(event.currentTarget.value);
        // This condition determines if your character has been selected or not
        if ($("#your-character").children().length === 0)
        {        
            for (var i = 0; i < starWarsCharacters.length; i++){
                if (starWarsCharacters[i].name === event.currentTarget.value)
                {
                    starWarsCharacters[i].element.attr('id','newId').appendTo("#your-character");
                    userCharacter = starWarsCharacters[i];
                }
                else
                {
                    starWarsCharacters[i].element.attr('id', 'newId').appendTo("#enemies-space"); 
                    enemiesArray.push(starWarsCharacters[i]);
                }
            }
            $("#character-space").empty();
        }
        else if (event.currentTarget.parentElement.id === "enemies-space")
        {
            console.log("clicked " + event.currentTarget.value)
            //No one is currently defending
            if ($("#defender-space").children().length === 0)
            {
                //Get in here if the user has selected a character, this element must be in 'enemies-space'            
                console.log("Want to attack " + event.currentTarget.value);
                //Remove the character from the enemies array...this is SO CLUNKY
                for(var i = 0; i < enemiesArray.length; i++)
                {
                    // Found the character that you want to attack
                    if (enemiesArray[i].name === event.currentTarget.value)
                    {
                        enemiesArray[i].element.attr('id', 'newId').appendTo("#defender-space");
                        // $("#defender-space").empty();
                        // $("#defender-space").append(enemiesArray[i].element);
                        defendingCharacter = enemiesArray[i];
                        enemiesArray.splice(i, 1);
                        // // event.currentTarget.attr("id", "newId").appendTo("#defender-space");
                        // //should always work to redraw the remaining enemies in the #enemies-space
                        // $("#enemies-space").empty();
                        // if (enemiesArray.length > 0)
                        // {
                        //     for (var i = 0; i < enemiesArray.length; i++)
                        //     {
                        //         $("#enemies-space").append(enemiesArray[i].element);
                        //     }
                        // }
                    }
                }
            }

            // console.log(event)
        }

    })

    $("#attack-button").click(function(event) {
        // Only do something if there's a character defending & user's character still has health points
        if (($("#defender-space").children().length > 0) && (!gameOver))
        {
            // Defending character loses health by baseAttack
            defendingCharacter.health -= userCharacter.currentAttack;
            defendingCharacter.updateStatus();

            // User's character loses health by counterAttack
            userCharacter.health -= defendingCharacter.counterAttack;
            userCharacter.updateStatus();

            // Add baseAttack rate to currentAttack
            userCharacter.currentAttack += userCharacter.baseAttack;

            // Defending character is dead, so this will empty the div
            if (defendingCharacter.health <= 0)
            {
                console.log("Should empty the div...")
                $("#defender-space").empty();
            }

            if (userCharacter.health <= 0)
            {
                gameOver = true;
            }
        }
    })
})

