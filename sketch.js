let createList = false;
let sizeButton;
let NodeButton;
let runButton;
let insertButton;
let sizeInput;
let nodesInput;
let searchButton;
let val;
let randomNum;
let randomIndex;
let hashTable = [];

let searchInp;
let searchIndex;
let searchFlag = false;

let insertFlag = false;

let animationStartTime = 0;
let animationDuration = 700;
let animationGap = 700;
let animationTenure = 3000;
let animationSpacing = 4500;

let play;
let forward=false;
let forBtn;

let runStopFlag=false;
let isRunning=false;

let totalStopTime=0;


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(300);

  // rectangle -1

  // rect(20, height - 210, 350, 150);
  let box = createDiv();
  box.class("card");
  box.position(5, 350);
  box.size(368, 170);

  //-2
  fill(300);
  noStroke();

  rect(380, height - 580, 880, 550);

  // create button
  let createListButton = createButton("create");
  createListButton.class("button");
  createListButton.position(30, height - 220);
  createListButton.mouseClicked(create);

  // size button
  sizeButton = createButton("Size");
  sizeButton.position(createListButton.x + 80, height - 220);
  sizeButton.class("button");
  sizeButton.hide();
  sizeButton.mouseClicked(userSize);

  // number of Nodes
  NodeButton = createButton("No. of Nodes");
  NodeButton.position(sizeButton.x + 60, height - 220);
  NodeButton.class("button");
  NodeButton.hide();
  NodeButton.mouseClicked(userNodes);

  //empty button
  emptyButton = createButton("Empty");
  emptyButton.position(NodeButton.x + 122, height - 220);
  emptyButton.class("button");
  emptyButton.hide();
  emptyButton.mouseClicked(EmptyTable);

  // run button
  runButton = createButton("Go");
  runButton.position(emptyButton.x + 75, height - 220);
  runButton.hide();
  runButton.class("button");
  runButton.mouseClicked(generateList);

  //search
  searchButton = createButton("Search");
  searchButton.class("button");
  searchButton.position(30, height - 175);
  searchButton.mouseClicked(searchHash);

  //Insert button
  insertButton = createButton("Insert");
  insertButton.class("button");
  insertButton.position(searchButton.x, height - 130);
  insertButton.mouseClicked(InsertNode);

  //remove button
  let removeNode = createButton("Remove");
  removeNode.class("button");
  removeNode.position(insertButton.x, height - 80);
  removeNode.mouseClicked(RemoveNode);

  box.child();

  // play 
  play=createButton("Play");
  play.class("button")
  play.position(insertButton.x+600,height-80);
  play.mouseClicked(Playfun);

  //forward

  forBtn=createButton("forward");
  forBtn.class("button");
  forBtn.position(play.x+100,height-80);
  forBtn.mouseClicked(forwardAnimation);
}

//hard Code
function hardCode(step) {
  const algorithmBox = document.getElementById("algorithm-box");
  if (algorithmBox && algorithmBox instanceof HTMLElement) {
    const algorithmSteps = [
      "i = key%HT.length;",
      "for j = 0 to HT_SC[i].length",
      "    if (HT_SC[i][j] == key)",
      "       return found Index",
      "return NOT_FOUND",
    ];
    console.log(algorithmSteps);
    algorithmBox.innerHTML = "";

    for (let i = 0; i < algorithmSteps.length; i++) {
      const stepText = algorithmSteps[i];
      const stepElement = document.createElement("div");
      stepElement.textContent = stepText;

      if (i === step) {
        stepElement.classList.add("highlight");
      }

      algorithmBox.appendChild(stepElement);
    }
  }
}
//insert
function hardCode2(step) {
  const algorithmBox = document.getElementById("algorithm-box");
  if (algorithmBox && algorithmBox instanceof HTMLElement) {
    const algorithmSteps = [
      "i = key%HT.length;",
      "if HT_SC[i].length == 7, prevent insertion",
      " insert key to the back of this list i",
    ];
    console.log(algorithmSteps);
    algorithmBox.innerHTML = "";

    for (let i = 0; i < algorithmSteps.length; i++) {
      const stepText = algorithmSteps[i];
      const stepElement = document.createElement("div");
      stepElement.textContent = stepText;

      if (i === step) {
        stepElement.classList.add("highlight");
      }

      algorithmBox.appendChild(stepElement);
    }
  }
}

//create function
function create() {
  if (createList) {
    createList = false;
  } else {
    createList = true;
  }
}

function draw() {
  if (createList) {
    sizeButton.show();
    NodeButton.show();
    runButton.show();
    emptyButton.show();
  } else {
    sizeButton.hide();
    NodeButton.hide();
    runButton.hide();
    emptyButton.hide();
  }
  if (searchFlag === true && searchInp > 0 && isRunning) {
    let nodes = hashTable[searchIndex].nodes;
    let found = false;
    let elapsedTime = millis() - animationStartTime;

    for (let i = 0; i < nodes.length + 1; i++) {
      if (
        i === nodes.length &&
        found === false &&
        elapsedTime > animationSpacing * nodes.length
      ) {
        hardCode(4);
        alert("Node is not present");
        searchFlag = false;
        break;
      } else if (
        i === nodes.length &&
        found === true &&
        elapsedTime > animationSpacing * nodes.length
      ) {
        searchFlag = false;
        hardCode(10);
        break;
      }

      let x = windowWidth / 3 + searchIndex * 120 + 30;
      let y = height - 450 + 50 * i;

      if (elapsedTime > animationSpacing * i) {
        let progress = constrain(
          (elapsedTime - animationSpacing * i) / animationTenure,
          0,
          1
        );
        let animatedDiameter = lerp(0, 32, progress);
        let currentNode = nodes[i];
        console.log(currentNode + "nsjekenfk");
        fill(255);
        circle(x, y, animatedDiameter);
        let fSize = lerp(0, 16, progress);
        textSize(fSize);

        hardCode(2);
        fill(220, 220, 0); //yellow
        circle(x, y, animatedDiameter);

        fill(0, 0, 0);
        text(currentNode, x, y);

        if (
          currentNode == searchInp &&
          elapsedTime > (animationSpacing + 200) * i + animationTenure + 500
        ) {
          hardCode(3); //found
          fill(0, 0, 180);
          circle(x, y, 32); // Blue color for the found node

          fill(0, 0, 0);
          text(currentNode, x, y);

          found = true;
        } else if (
          currentNode != searchInp &&
          elapsedTime > (animationSpacing + 200) * i + animationTenure + 500
        ) {
          hardCode(1);
          fill(180, 0, 0);
          circle(x, y, 32); // Red color for nodes that are not the target

          fill(0, 0, 0);
          text(currentNode, x, y);
        }

        text(currentNode, x, y);
      }

    }

    // if (!found) {

    // }
  }
}

// user define size
function userSize() {
  sizeInput = prompt("Enter the size");
}

// user defined Nodes
function userNodes() {
  nodesInput = prompt("Enter the number of nodes");
}

//Empty Hash table

function EmptyTable() {
  console.log("Empty");

  sizeInput = 0;
  nodesInput = 0;
  hashTable = [];
  fill(100);
  rect(380, height - 580, 880, 550);
}

// generate list
function generateList() {
  fill(300);
  rect(380, height - 580, 880, 550);
  textSize(20);
  textAlign(CENTER, CENTER);

  if (sizeInput > 10) {
    alert("Enter a value less than 10");
  }
  if (nodesInput > 15) {
    alert("Enter a value less than 15");
  }

  if (!isNaN(sizeInput) && sizeInput < 10) {
    hashTable = [];

    for (let i = 0; i < sizeInput; i++) {
      hashTable.push({ key: "H", nodes: [] });
    }

    // Attaching Nodes to Key(H) 0-nodesInput(eg-8)

    for (let i = 0; i < nodesInput; i++) {
      randomNum = floor(random(100));
      randomIndex = randomNum % sizeInput;

      hashTable[randomIndex].nodes.push(randomNum);
    }
  }

  for (let i = 0; i < hashTable.length; i++) {
    let x = windowWidth / 3 + i * 120;
    let y = height - 500;
    fill(200);
    circle(x, y, 35);

    fill(0);
    text(hashTable[i].key, x + 1, y + 2);
    animationStartTime = millis();

    // Drawing attached nodes
    let posX = x + 30;
    let posY = y + 50;
    for (let j = 0; j < hashTable[i].nodes.length; j++) {
      fill(0, 210, 30);
      textSize(16);
      circle(posX, posY, 32);
      fill(255);
      text(hashTable[i].nodes[j], posX, posY);
      posY += 50;
    }
  }
}

// search
// search
function searchHash() {
  if (sizeInput > 0) {
    searchInp = prompt("Enter the value to search");
    searchIndex = searchInp % sizeInput; // This will give the index of the searching node

    if (searchIndex >= 0 && searchIndex < sizeInput) {
      if (hashTable[searchIndex].nodes.length > 0) {
        isRunning=false;
        runStopFlag=false;
        Playfun();
        animationStartTime = millis();
        searchFlag = true;
        document.getElementById("algorithm-box").style.display = "block";
        hardCode(0);
        // animateSearch(searchIndex, searchInp);
      } else {
        alert("Node is not present");
      }
    }
  }
}

// function animateSearch(searchIndex, searchInp) {

// }

//InsertNode

function InsertNode() {
  let insertVal = prompt("Enter the value which you want to insert");
  if (insertVal > 0 ) {
    fill(300);
    rect(380, height - 580, 880, 550);

    insertFlag = true;

    if (insertFlag === true) {
      document.getElementById("algorithm-box").style.display = "block";
    }

    hardCode2(0);
    let insertIndex = insertVal % sizeInput;
    hardCode2(1);
    hashTable[insertIndex].nodes.push(insertVal);
    hardCode2(2);

    for (let i = 0; i < hashTable.length; i++) {
      let x = windowWidth / 3 + i * 120;
      let y = height - 500;
      fill(255);
      circle(x, y, 32);

      fill(0);
      text(hashTable[i].key, x + 1, y + 2);
      animationStartTime = millis();

      // Drawing attached nodes
      let posX = x + 30;
      let posY = y + 50;
      for (let j = 0; j < hashTable[i].nodes.length; j++) {
        if (hashTable[i].nodes[j] == insertVal) {
          fill(0, 30, 200); // Blue color for the newly inserted node
        } else {
          fill(0, 200, 30);
        }
        textSize(16);
        circle(posX, posY, 29);

        fill(255);
        text(hashTable[i].nodes[j], posX, posY);
        posY += 50;
      }
    }
  } else {
    alert("You have not entered a value ");
  }
}

function RemoveNode() {
  let removeVal = prompt("Enter the element to remove");
  if (removeVal) {
    fill(300);
    rect(380, height - 580, 880, 550);

    let removeIndex = removeVal % sizeInput;

    if (removeIndex >= 0 && removeIndex < hashTable.length) {
      const nodes = hashTable[removeIndex].nodes;
      console.log(nodes);

      console.log(removeVal, typeof removeVal);
      const nodeToRemove = nodes.indexOf(parseInt(removeVal));

      console.log("removed " + nodeToRemove);
      if (nodeToRemove !== -1) {
        nodes.splice(nodeToRemove, 1);
      } else {
        console.log(
          `Element with value '${removeVal}' not found in the hash table.`
        );
      }
    } else {
      console.log("Invalid hash index.");
    }

    // console.log(hashTable + "befor");

    for (let i = 0; i < hashTable.length; i++) {
      console.log(i + "after");

      let x = windowWidth / 3 + i * 120;
      let y = height - 500;
      fill(255);
      circle(x, y, 32);

      fill(0);

      text(hashTable[i].key, x + 1, y + 2);
      animationStartTime = millis();

      // Drawing attached nodes
      let posX = x + 30;
      let posY = y + 50;
      for (let j = 0; j < hashTable[i].nodes.length; j++) {
        fill(0, 210, 30);
        textSize(16);
        circle(posX, posY, 32);
        fill(255);
        text(hashTable[i].nodes[j], posX, posY);
        posY += 50;
      }
    }
  }
}
function Playfun(){
   
  if(runStopFlag){
    play.html('play');
    totalStopTime = millis() - animationStartTime;
    isRunning = false;
    runStopFlag=false;
    // playButton.removeAttribute('disabled');
    // pauseButton.attribute('disabled', true);
    
  }
  else if(!runStopFlag){

    play.html('pause');
    isRunning = true;
    runStopFlag=true;
    animationStartTime = millis() - totalStopTime;

    if(forward===true){
      setTimeout(Playfun,1800);
      forward=false;
    }

    // playButton.attribute('disabled', true);
    
  }

  
}
async function forwardAnimation(){
  forward=true;
  Playfun();
}

