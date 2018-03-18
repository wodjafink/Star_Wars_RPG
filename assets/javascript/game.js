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
    this.status.text(this.health)
  }
}

$(document).ready(function () {

    // Create Characters
    var obi = new Jedi("Obi-Wan Kenobi", "assets/images/obi.jpg", 100, 10, 20);
    var anakin = new Jedi("Anakin Skywalker", "assets/images/anakin.jpg", 100, 10, 20);
    var emperor = new Jedi("Sheev Palpatine", "assets/images/emperor.jpg", 100, 10, 20);
    var grievous = new Jedi("General Grievous", "assets/images/grievous.jpg", 100, 10, 20);

    //containing array
    var starWarsCharacters = [obi, anakin, emperor, grievous];

    //Add characters to character space
    for (var i = 0; i < starWarsCharacters.length; i++)
    {
        $("#character-space").append(starWarsCharacters[i].element)
    }

    //Set up click listener to click on a character card.  This selects the player's character
    $(".card").click(function(event) {
        console.log("Clicked a jedi");
        console.log(event.currentTarget.value);
        for (var i = 0; i < starWarsCharacters.length; i++){
            if (starWarsCharacters[i].name === event.currentTarget.value)
            {
                $("#your-character").append(starWarsCharacters[i].element);
            }
            else
            {
                $("#enemies-space").append(starWarsCharacters[i].element);
            }
        }
        $("#character-space").empty();
    })
})

