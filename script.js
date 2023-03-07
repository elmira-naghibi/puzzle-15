class Board {
    constructor(row , col) {
      this.m = row;
      this.n = col;
      this.container = document.getElementById("board");
      this.tiles = [];
      this.message = document.getElementById("message");
      this.emptyTile = { row: 0, col: 0 };
      this.handleSizeBoard()
      this.createTiles();
      this.shuffleTiles();
      this.displayTiles();
    }

    handleSizeBoard(){
      this.container.style.width = `${this.n*100}px`;
      this.container.style.height = `${this.m*100}px`
    }
  
    createTiles() {
      for (let i = 0; i < this.m * this.n - 1; i++) {
        this.tiles.push(i + 1);
      }
      this.tiles.push("");
      
    }
  
    shuffleTiles() {
      for (let i = this.tiles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.tiles[i], this.tiles[j]] = [this.tiles[j], this.tiles[i]];
      }
    }
  
    displayTiles() {
      while (this.container.firstChild) {
        this.container.removeChild(this.container.firstChild);
      }
      for (let row = 0; row < this.m; row++) {
        for (let col = 0; col < this.n; col++) {
          const tile = document.createElement("div");
          tile.classList.add("tile");
          tile.textContent = this.tiles[row * this.n + col];
          tile.style.top = `${row * 100 / this.m}%`;
          tile.style.left = `${col * 100 / this.n}%`;
          const widthSizeTiles = 100 / this.n;
          const HeightSizeTiles = 100 / this.m;

          tile.style.width = `${widthSizeTiles}%`;
          tile.style.height = `${HeightSizeTiles}%`;

          tile.addEventListener("click", () => this.handleTileClick(row, col));
          this.container.appendChild(tile);
          if (tile.textContent === "") {
            this.emptyTile.row = row;
            this.emptyTile.col = col;
          }
        }
      }
    }
  
    handleTileClick(row, col) {
      if ((row === this.emptyTile.row && Math.abs(col - this.emptyTile.col) === 1) ||
        (col === this.emptyTile.col && Math.abs(row - this.emptyTile.row) === 1)) {

        // Move the tile to the empty space
        const clickedIndex = row * this.n + col;
        let emptyTilesIndex= this.emptyTile.row * this.n + this.emptyTile.col;
        let temp = this.tiles[clickedIndex];
        this.tiles[clickedIndex]="";
        this.tiles[emptyTilesIndex]=temp
        this.emptyTile.row = row;
        this.emptyTile.col = col;
        this.displayTiles();
        if (this.isSolved())
          return this.message.textContent = "Congratulations! You solved the puzzle!";
        return this.message.textContent = "";
      }
    }
  
    isSolved() {
      for (let i = 0; i < this.tiles.length - 1; i++) {
        if (this.tiles[i] !== i + 1) {
          return false;
        }
      }
     return  true;
    }
  }
  
  // Start a new game
  function newGame(row , col) {
    const board = new Board(row ,col);
  }