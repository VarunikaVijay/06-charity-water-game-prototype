const countries = {
  "Bangladesh": ["Hand-Dug Wells", "Drilled Wells", "Piped Systems", "Latrines"],
  "Bolivia": ["Gravity Fed Systems"],
  "Burkina Faso": ["Drilled Wells"],
  "Cambodia": ["BioSand Filters"],
  "Central African Republic": ["Drilled Wells"],
  "Cote d'Ivoire": ["Hand-Dug Wells", "Drilled Wells", "Piped Systems", "Latrines"],
  "Democratic Republic of the Congo": ["Piped Systems"],
  "Ethiopia": [
    "Hand-Dug Wells", "Drilled Wells", "Piped Systems",
    "Latrines", "Gravity Fed Systems", "Spring Protections"],
  "Guatemala": ["Hand-Dug Wells", "Gravity Fed Systems", "Rainwater Catchments"],
  "Haiti": ["Spring Protections", "Drilled Wells", "Gravity Fed Systems"],
  "Honduras": ["Hand-Dug Wells", "Gravity Fed Systems"],
  "India": ["Drilled Wells", "Hand-Dug Wells", "Piped Systems", "Latrines", "Rainwater Catchments"],
  "Kenya": ["Hand-Dug Wells", "Drilled Wells", "Rainwater Catchments", "Piped Systems"],
  "Liberia": ["Hand-Dug Wells", "Drilled Wells", "Rainwater Catchments", "Piped Systems"],
  "Madagascar": ["Piped Systems"],
  "Malawi": ["Drilled Wells", "Piped Systems", "Hand-Dug Wells", "Latrines"],
  "Mali": ["Drilled Wells", "Piped Systems"],
  "Mozambique": ["Drilled Wells", "Piped Systems"], 
  "Nepal": [
    "Drilled Wells", "Hand-Dug Wells", "Water Purification Systems",
    "Rainwater Catchments", "Gravity Fed Systems", "Piped Systems"
  ],
  "Niger": ["Drilled Wells", "Piped Systems"], 
  "Pakistan": ["Drilled Wells"],
  "Rwanda": [
    "Rainwater Catchments", "Spring Protections", "Piped Systems",
    "Drilled Wells", "Gravity Fed Systems"
  ],
  "Senegal": ["Piped Systems"],
  "Sierra Leone": ["Hand-Dug Wells", "Drilled Wells"],
  "Tanzania": ["Piped Systems", "Rainwater Catchments", "Latrines", "Drilled Wells"],
  "Uganda": ["Drilled Wells", "Rainwater Catchments"]
};

const countryScroll = document.getElementById('countryScroll');
const puzzleGrid = document.getElementById('puzzleGrid');
const puzzleSection = document.getElementById('puzzleSection');
const startBtn = document.getElementById('startBtn');

// Get the select country instruction element
const selectCountryInstruction = document.querySelector('.select-country-instruction');

let selectedCountry = null;
let selectedLevel = null;

// Difficulty settings
const difficultySettings = {
  "Easy": { moves: 20, objective: 10 },
  "Medium": { moves: 22, objective: 15 },
  "Hard": { moves: 15, objective: 20 },
  "Extra Hard": { moves: 10, objective: 25 }
};

// Helper to get difficulty by level index
function getDifficultyByIndex(index) {
  if (index === 0) return "Easy";
  if (index === 1) return "Medium";
  if (index === 2) return "Hard";
  return "Extra Hard";
}

// Add a mapping of country names to flag emojis or PNGs
const countryFlags = {
  // Use PNGs for the first 13 countries, emoji for the rest
  "Bangladesh": '<img src="img/Bangladesh.png" alt="Bangladesh flag" class="flag-img">',
  "Bolivia": '<img src="img/Bolivia.png" alt="Bolivia flag" class="flag-img">',
  "Burkina Faso": '<img src="img/Burkina Faso.png" alt="Burkina Faso flag" class="flag-img">',
  "Cambodia": '<img src="img/Cambodia.png" alt="Cambodia flag" class="flag-img">',
  "Central African Republic": '<img src="img/Central African Republic.png" alt="Central African Republic flag" class="flag-img">',
  "Cote d'Ivoire": '<img src="img/Cote d\'Ivoire.png" alt="Cote d\'Ivoire flag" class="flag-img">',
  "Democratic Republic of the Congo": '<img src="img/DRC.png" alt="Democratic Republic of the Congo flag" class="flag-img">',
  "Ethiopia": '<img src="img/Ethiopia.png" alt="Ethiopia flag" class="flag-img">',
  "Guatemala": '<img src="img/Guatemala.png" alt="Guatemala flag" class="flag-img">',
  "Haiti": '<img src="img/Haiti.png" alt="Haiti flag" class="flag-img">',
  "Honduras": '<img src="img/Honduras.png" alt="Honduras flag" class="flag-img">',
  "India": '<img src="img/India.png" alt="India flag" class="flag-img">',
  "Kenya": '<img src="img/Kenya.png" alt="Kenya flag" class="flag-img">',
  "Liberia": '<img src="img/Liberia.png" alt="Liberia flag" class="flag-img">',
  "Madagascar": '<img src="img/Madagascar.png" alt="Madagascar flag" class="flag-img">',
  "Malawi": '<img src="img/Malawi.png" alt="Malawi flag" class="flag-img">',
  "Mali": '<img src="img/Mali.png" alt="Mali flag" class="flag-img">',
  "Mozambique": '<img src="img/Mozambique.png" alt="Mozambique flag" class="flag-img">',
  "Nepal": '<img src="img/Nepal.png" alt="Nepal flag" class="flag-img">',
  "Niger": '<img src="img/Niger.png" alt="Niger flag" class="flag-img">',
  "Pakistan": '<img src="img/Pakistan.png" alt="Pakistan flag" class="flag-img">',
  "Rwanda": '<img src="img/Rwanda.png" alt="Rwanda flag" class="flag-img">',
  "Senegal": '<img src="img/Senegal.png" alt="Senegal flag" class="flag-img">',
  "Sierra Leone": '<img src="img/Sierra Leone.png" alt="Sierra Leone flag" class="flag-img">',
  "Tanzania": '<img src="img/Tanzania.png" alt="Tanzania flag" class="flag-img">',
  "Uganda": '<img src="img/Uganda.png" alt="Uganda flag" class="flag-img">'
};

function renderCountryFlags() {
  countryScroll.innerHTML = ""; // Clear previous flags
  Object.keys(countries).forEach(country => {
    const div = document.createElement('div');
    div.className = 'country-flag';

    // If the flag is an <img>, use innerHTML, else use textContent for emoji
    if (countryFlags[country] && countryFlags[country].startsWith('<img')) {
      div.innerHTML = `
        ${countryFlags[country]}
        <span class="country-name-text">${country}</span>
      `;
    } else {
      // Use emoji
      const flagSpan = document.createElement('span');
      flagSpan.className = 'flag-emoji';
      flagSpan.textContent = countryFlags[country] || "🏳️";
      const nameSpan = document.createElement('span');
      nameSpan.className = 'country-name-text';
      nameSpan.textContent = country;
      div.appendChild(flagSpan);
      div.appendChild(nameSpan);
    }

    div.addEventListener('click', () => selectCountry(country));
    countryScroll.appendChild(div);
  });
}

function selectCountry(country) {
  selectedCountry = country;
  puzzleSection.querySelector('h2').textContent = country;
  // Set the default selected level to the first level for this country
  const levels = countries[country];
  if (levels && levels.length > 0) {
    selectedLevel = levels[0];
  } else {
    selectedLevel = null;
  }
  renderPuzzleList(levels);
}

function renderPuzzleList(puzzles) {
  puzzleGrid.innerHTML = '';
  // Get how many levels are unlocked for this country
  const unlockedCount = getUnlockedCount(selectedCountry);
  puzzles.forEach((puzzle, index) => {
    const difficulty = getDifficultyByIndex(index);
    const tile = document.createElement('div');
    tile.className = 'puzzle-tile';
    // Only lock if index >= unlockedCount
    if (index >= unlockedCount) tile.classList.add('locked');
    // Show "Completed" for finished levels, "Unlocked" for the next playable, "Locked" for others
    let statusText = '';
    if (index < unlockedCount - 1) {
      statusText = 'Completed';
    } else if (index === unlockedCount - 1) {
      statusText = 'Unlocked';
    } else {
      statusText = 'Locked';
    }
    tile.innerHTML = `
      <strong>${puzzle}</strong>
      <div class="status">${statusText}</div>
      <div class="difficulty-label">Difficulty: ${difficulty}</div>
    `;
    // Only allow clicking unlocked levels
    if (index < unlockedCount) {
      tile.addEventListener('click', () => {
        selectedLevel = puzzle;
        startBtn.style.display = 'inline-block';
        selectedDifficulty = difficulty;
        // Remove 'selected' class from all tiles
        document.querySelectorAll('.puzzle-tile').forEach(t => t.classList.remove('selected'));
        // Add 'selected' class to the clicked tile
        tile.classList.add('selected');
      });
      // Highlight if this is the currently selected level
      if (selectedLevel === puzzle) {
        tile.classList.add('selected');
      }
    }
    puzzleGrid.appendChild(tile);
  });
  startBtn.style.display = 'none';
}

// Set default difficulty
let selectedDifficulty = "Easy";

// Track unlocked levels for each country
let unlockedLevels = {};

// Load unlocked levels from localStorage if available
if (localStorage.getItem('unlockedLevels')) {
  unlockedLevels = JSON.parse(localStorage.getItem('unlockedLevels'));
}

// Helper to get how many levels are unlocked for a country
function getUnlockedCount(country) {
  // Default: only first level unlocked
  return unlockedLevels[country] || 1;
}

// Helper to unlock the next level for a country
function unlockNextLevel(country) {
  const total = countries[country].length;
  let current = getUnlockedCount(country);
  if (current < total) {
    unlockedLevels[country] = current + 1;
    // Save progress to localStorage
    localStorage.setItem('unlockedLevels', JSON.stringify(unlockedLevels));
  }
}

renderCountryFlags();
selectCountry("Bangladesh");

const gameplaySection = document.getElementById('gameplaySection');
const gameGrid = document.getElementById('gameGrid');
const objectiveText = document.getElementById('objective');
const movesLeftText = document.getElementById('movesLeft');
const scoreText = document.getElementById('score');
const backBtn = document.getElementById('backBtn');

let currentScore = 0;
let movesLeft = 20;

startBtn.addEventListener('click', () => {
  if (selectedCountry && selectedLevel) {
    loadGamePlay(selectedCountry, selectedLevel);
  }
});

backBtn && backBtn.addEventListener('click', () => {
  // Show the country scroll bar and select country instruction again when returning to puzzle selection
  countryScroll.style.display = '';
  if (selectCountryInstruction) {
    selectCountryInstruction.style.display = '';
  }
  gameplaySection.style.display = 'none';
  puzzleSection.style.display = 'block';
});

function loadGamePlay(country, level) {
  // Hide the country scroll bar and select country instruction when playing the game
  countryScroll.style.display = 'none';
  if (selectCountryInstruction) {
    selectCountryInstruction.style.display = 'none';
  }
  puzzleSection.style.display = 'none';
  gameplaySection.style.display = 'block';
  currentScore = 0;

  // Determine the difficulty for this level
  const puzzles = countries[selectedCountry];
  const levelIndex = puzzles.indexOf(level);
  selectedDifficulty = getDifficultyByIndex(levelIndex);

  // Use selected difficulty settings
  const settings = difficultySettings[selectedDifficulty] || { moves: 20, objective: 10 };
  movesLeft = settings.moves;
  gameplaySection.dataset.objectiveLeft = settings.objective;

  objectiveText.textContent = `Match ${settings.objective} ${level}`;
  updateStats();
  renderGameGrid();
}

function updateStats() {
  scoreText.textContent = `Score: ${currentScore}`;
  movesLeftText.textContent = `Moves Left: ${movesLeft}`;
}

function renderGameGrid() {
  // All possible icons, matching the filenames in your img folder
  const allIcons = [
    { name: "BioSand Filters", file: "biosand filters.png" },
    { name: "Drilled Wells", file: "drilled wells.png" },
    { name: "Gravity Fed Systems", file: "gravity fed systems.png" },
    { name: "Hand-Dug Wells", file: "hand-dug wells.png" },
    { name: "Latrines", file: "latrines.png" },
    { name: "Piped Systems", file: "piped systems.png" },
    { name: "Rainwater Catchments", file: "rainwater catchments.png" },
    { name: "Spring Protections", file: "spring protections.png" },
    { name: "Water Purification Systems", file: "water purification systems.png" }
  ];

  // Get the current level's objective icon name
  const levelIcons = selectedLevel ? [selectedLevel] : [];

  // Add up to 4 more icons (not repeating the objective icon)
  for (let i = 0; i < allIcons.length && levelIcons.length < 5; i++) {
    const iconName = allIcons[i].name;
    if (iconName !== selectedLevel && countries[selectedCountry].includes(iconName)) {
      levelIcons.push(iconName);
    }
  }
  // If still less than 5, fill with any other icons (not repeating)
  for (let i = 0; i < allIcons.length && levelIcons.length < 5; i++) {
    const iconName = allIcons[i].name;
    if (!levelIcons.includes(iconName)) {
      levelIcons.push(iconName);
    }
  }

  // Build the icons array for this level
  const icons = levelIcons.map(iconName => {
    const iconObj = allIcons.find(obj => obj.name === iconName);
    return `<img src="img/${iconObj.file}" alt="${iconObj.name}" style="width: 40px; height: 40px;">`;
  });

  // Find the index of the objective icon in the icons array
  const objectiveIconIndex = levelIcons.indexOf(selectedLevel);

  // Helper to update the objective text
  function updateObjectiveText() {
    const left = gameplaySection.dataset.objectiveLeft || 10;
    objectiveText.textContent = `Match ${left} ${selectedLevel}`;
  }

  gameGrid.innerHTML = '';
  gameGrid.style.gridTemplateColumns = 'repeat(9, 1fr)';

  // Create a 2D array to store the grid icons
  const grid = [];
  for (let row = 0; row < 9; row++) {
    grid[row] = [];
    for (let col = 0; col < 9; col++) {
      const icon = icons[Math.floor(Math.random() * icons.length)];
      grid[row][col] = icon;
    }
  }

  let selectedCell = null;

  function areAdjacent(r1, c1, r2, c2) {
    return (Math.abs(r1 - r2) === 1 && c1 === c2) || (Math.abs(c1 - c2) === 1 && r1 === r2);
  }

  function updateDOMGrid() {
    for (let i = 0; i < gameGrid.children.length; i++) {
      const cell = gameGrid.children[i];
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      cell.innerHTML = grid[row][col];
      cell.classList.remove('matched');
      cell.classList.remove('selected');
    }
  }

  // Helper to check if two icons are the same (by string)
  function isSameIcon(a, b) {
    return a === b;
  }

  // Checks if there's a match of 3+ at (row, col)
  function checkMatchAt(row, col) {
    const val = grid[row][col];
    let count = 1;
    // Check horizontally
    let left = col - 1;
    while (left >= 0 && isSameIcon(grid[row][left], val)) { count++; left--; }
    let right = col + 1;
    while (right < 9 && isSameIcon(grid[row][right], val)) { count++; right++; }
    if (count >= 3) return true;
    // Check vertically
    count = 1;
    let up = row - 1;
    while (up >= 0 && isSameIcon(grid[up][col], val)) { count++; up--; }
    let down = row + 1;
    while (down < 9 && isSameIcon(grid[down][col], val)) { count++; down++; }
    if (count >= 3) return true;
    return false;
  }

  // Returns true if a swap at (r1,c1) <-> (r2,c2) would create a match
  function swapCreatesMatch(r1, c1, r2, c2) {
    const temp = grid[r1][c1];
    grid[r1][c1] = grid[r2][c2];
    grid[r2][c2] = temp;
    const result = checkMatchAt(r1, c1) || checkMatchAt(r2, c2);
    grid[r2][c2] = grid[r1][c1];
    grid[r1][c1] = temp;
    return result;
  }

  // Add popup elements for win/lose messages
  function createPopup() {
    // Only add if not already present
    if (document.getElementById('popupOverlay')) return;
    const popup = document.createElement('div');
    popup.id = 'popupOverlay';
    popup.style.display = 'none';
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.width = '100vw';
    popup.style.height = '100vh';
    popup.style.background = 'rgba(0,0,0,0.5)';
    popup.style.zIndex = '200';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.innerHTML = `
      <div id="popupBox" style="
        background: #fff;
        border-radius: 12px;
        padding: 2rem 1.5rem;
        max-width: 420px;
        width: 90vw;
        margin: auto;
        text-align: center;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        display: flex;
        flex-direction: column;
        align-items: center;
      ">
        <h2 id="popupTitle"></h2>
        <p id="popupMsg"></p>
        <button id="returnHomeBtn" style="
          margin-top:1rem;
          width: 100%;
          max-width: 220px;
          box-sizing: border-box;
          font-size: 1rem;
          padding: 0.6rem 1rem;
          border-radius: 4px;
          background: #ffcc00;
          border: none;
          font-weight: bold;
          cursor: pointer;
          display: block;
        ">Return to Homepage</button>
      </div>
    `;
    document.body.appendChild(popup);

    document.getElementById('returnHomeBtn').onclick = function() {
      popup.style.display = 'none';
      gameplaySection.style.display = 'none';
      puzzleSection.style.display = 'block';
      // Show the country scroll bar and select country instruction again
      countryScroll.style.display = '';
      if (selectCountryInstruction) {
        selectCountryInstruction.style.display = '';
      }
      // If a callback is set (for win), call it
      if (typeof window._popupOnComplete === 'function') {
        window._popupOnComplete();
        window._popupOnComplete = null;
      }
      // Select the last played country again
      if (selectedCountry) {
        selectCountry(selectedCountry);
      }
    };
  }
  createPopup();

  // Show popup with title and message
  function showPopup(title, msg, onComplete) {
    document.getElementById('popupTitle').textContent = title;
    // Use innerHTML so HTML tags like <br> and <strong> are rendered
    document.getElementById('popupMsg').innerHTML = msg;
    document.getElementById('popupOverlay').style.display = 'flex';
    // Store callback for after popup closes
    window._popupOnComplete = onComplete;
  }

  // Check for win/lose after every match or move
  function checkWinLose() {
    const left = parseInt(gameplaySection.dataset.objectiveLeft || 10, 10);
    if (left <= 0) {
      // Player completed the objective

      // Show confetti when player wins
      showConfetti();

      // Calculate bonus points for unused moves
      const bonusPoints = movesLeft * 2; // 2 points for each unused move
      currentScore += bonusPoints; // Add bonus to current score

      // Add the current score to the rewards summary (totalPoints in localStorage)
      let totalPoints = localStorage.getItem('totalPoints');
      if (!totalPoints) {
        totalPoints = 0;
      } else {
        totalPoints = parseInt(totalPoints, 10);
      }
      totalPoints += currentScore;
      localStorage.setItem('totalPoints', totalPoints);

      // Get country description and photo
      const countryInfo = countryDescriptions[selectedCountry];
      let countryHtml = "";
      if (countryInfo) {
        countryHtml = `
          <div style="margin:1rem 0;">
            <img src="${countryInfo.img}" alt="${selectedCountry}" style="width:100%;max-width:220px;border-radius:8px;box-shadow:0 2px 8px #0001;">
          </div>
          <div style="font-size:1rem; color:#333; margin-bottom:0.5rem;">
            <strong>About ${selectedCountry}:</strong><br>
            ${countryInfo.desc}
          </div>
        `;
      }

      // Show the total score and bonus in the winning message, plus country info
      showPopup(
        "Level Complete!",
        `Congratulations! You finished the level.<br>Your Total Score: <strong>${currentScore}</strong><br>Bonus for Unused Moves: <strong>${bonusPoints}</strong><br>${countryHtml}`,
        function() {
          // Unlock next level for this country
          unlockNextLevel(selectedCountry);
        }
      );
    } else if (movesLeft <= 0) {
      // Player failed the level
      showPopup("Level Failed", "You ran out of moves. Try again!");
    }
  }

  // Find and clear matches, and update score if objective icon is matched
  function findAndClearMatches() {
    const matched = [];
    for (let row = 0; row < 9; row++) {
      matched[row] = Array(9).fill(false);
    }

    // Store info about matches for scoring
    let matchGroups = [];

    // Check rows for matches
    for (let row = 0; row < 9; row++) {
      let count = 1;
      for (let col = 1; col < 9; col++) {
        if (isSameIcon(grid[row][col], grid[row][col - 1]) && grid[row][col] !== null) {
          count++;
        } else {
          if (count >= 3) {
            matchGroups.push({ type: grid[row][col - 1], count: count, cells: [] });
            for (let k = 0; k < count; k++) {
              matched[row][col - 1 - k] = true;
              matchGroups[matchGroups.length - 1].cells.push([row, col - 1 - k]);
            }
          }
          count = 1;
        }
      }
      if (count >= 3) {
        matchGroups.push({ type: grid[row][8], count: count, cells: [] });
        for (let k = 0; k < count; k++) {
          matched[row][8 - k] = true;
          matchGroups[matchGroups.length - 1].cells.push([row, 8 - k]);
        }
      }
    }

    // Check columns for matches
    for (let col = 0; col < 9; col++) {
      let count = 1;
      for (let row = 1; row < 9; row++) {
        if (isSameIcon(grid[row][col], grid[row - 1][col]) && grid[row][col] !== null) {
          count++;
        } else {
          if (count >= 3) {
            matchGroups.push({ type: grid[row - 1][col], count: count, cells: [] });
            for (let k = 0; k < count; k++) {
              matched[row - 1 - k][col] = true;
              matchGroups[matchGroups.length - 1].cells.push([row - 1 - k, col]);
            }
          }
          count = 1;
        }
      }
      if (count >= 3) {
        matchGroups.push({ type: grid[8][col], count: count, cells: [] });
        for (let k = 0; k < count; k++) {
          matched[8 - k][col] = true;
          matchGroups[matchGroups.length - 1].cells.push([8 - k, col]);
        }
      }
    }

    // Score calculation for matches
    let foundMatch = false;
    let matchedObjectiveCount = 0;
    for (let i = 0; i < matchGroups.length; i++) {
      const group = matchGroups[i];
      // Check if this group is the objective icon
      if (isSameIcon(group.type, icons[objectiveIconIndex])) {
        matchedObjectiveCount += group.count; // Count how many objective tiles matched
        // Add points for objective matches: +10 for 3, +20 for 4, +30 for 5 or more
        if (group.count === 3) {
          currentScore += 10;
        } else if (group.count === 4) {
          currentScore += 20;
        } else if (group.count >= 5) {
          currentScore += 30;
        }
      } else {
        // Non-objective match: add 5 points
        currentScore += 5;
      }
      updateStats();
    }

    // Decrease the objective number by the number matched
    if (matchedObjectiveCount > 0) {
      let left = parseInt(gameplaySection.dataset.objectiveLeft || 10, 10);
      left = left - matchedObjectiveCount;
      gameplaySection.dataset.objectiveLeft = left > 0 ? left : 0;
      updateObjectiveText();
    }

    // Clear matched cells
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (matched[row][col]) {
          grid[row][col] = null;
          foundMatch = true;
        }
      }
    }

    // Show matched cells in the DOM for a short time
    if (foundMatch) {
      for (let i = 0; i < gameGrid.children.length; i++) {
        const cell = gameGrid.children[i];
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        if (matched[row][col]) {
          cell.classList.add('matched');
        }
      }
    }

    // Check win/lose after matches
    checkWinLose();
    return foundMatch;
  }

  function shiftAndFillGrid() {
    for (let col = 0; col < 9; col++) {
      let pointer = 8;
      for (let row = 8; row >= 0; row--) {
        if (grid[row][col] !== null) {
          grid[pointer][col] = grid[row][col];
          pointer--;
        }
      }
      // Fill the rest with new random icons
      for (let row = pointer; row >= 0; row--) {
        grid[row][col] = icons[Math.floor(Math.random() * icons.length)];
      }
    }
  }

  function handleMatches() {
    // Keep checking for matches and clearing until no more matches
    let found;
    function process() {
      found = findAndClearMatches();
      updateDOMGrid();
      if (found) {
        // Wait a bit so player can see the matched tiles
        setTimeout(() => {
          shiftAndFillGrid();
          updateDOMGrid();
          // Check again for new matches (chain reactions)
          process();
        }, 350);
      }
    }
    process();
  }

  // Render the grid cells
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement('div');
      cell.className = 'grid-cell';
      cell.innerHTML = grid[row][col];
      cell.dataset.row = row;
      cell.dataset.col = col;

      cell.addEventListener('click', function () {
        if (!selectedCell) {
          selectedCell = cell;
          cell.classList.add('selected');
        } else if (selectedCell === cell) {
          cell.classList.remove('selected');
          selectedCell = null;
        } else {
          const r1 = parseInt(selectedCell.dataset.row);
          const c1 = parseInt(selectedCell.dataset.col);
          const r2 = parseInt(cell.dataset.row);
          const c2 = parseInt(cell.dataset.col);

          if (areAdjacent(r1, c1, r2, c2)) {
            // Try the swap in memory
            const temp = grid[r1][c1];
            grid[r1][c1] = grid[r2][c2];
            grid[r2][c2] = temp;

            // Check if swap creates a match
            if (checkMatchAt(r1, c1) || checkMatchAt(r2, c2)) {
              selectedCell.innerHTML = grid[r1][c1];
              cell.innerHTML = grid[r2][c2];

              if (movesLeft > 0) {
                movesLeft--;
                updateStats();
              }

              selectedCell.classList.remove('selected');
              selectedCell = null;

              setTimeout(() => {
                handleMatches();
                // Check win/lose after the move (in case no match is possible)
                checkWinLose();
              }, 100);
            } else {
              // Swap back in memory (no match)
              grid[r2][c2] = grid[r1][c1];
              grid[r1][c1] = temp;

              // Briefly show swap and revert for feedback
              selectedCell.innerHTML = grid[r2][c2];
              cell.innerHTML = grid[r1][c1];
              selectedCell.classList.add('no-match');
              cell.classList.add('no-match');

              // Subtract 3 points for a failed swap
              currentScore -= 3;
              if (currentScore < 0) {
                currentScore = 0; // Prevent negative scores
              }
              updateStats();

              setTimeout(() => {
                selectedCell.innerHTML = grid[r1][c1];
                cell.innerHTML = grid[r2][c2];
                selectedCell.classList.remove('no-match');
                cell.classList.remove('no-match');
                selectedCell.classList.remove('selected');
                selectedCell = null;
              }, 350);
              // Check win/lose after a failed move
              checkWinLose();
            }
          } else {
            selectedCell.classList.remove('selected');
            selectedCell = cell;
            cell.classList.add('selected');
          }
        }
      });

      gameGrid.appendChild(cell);
    }
  }

  setTimeout(() => {
    handleMatches();
  }, 100);
}

// Simple confetti function using DOM elements (no libraries)
function showConfetti() {
  // Remove old confetti if present
  const oldConfetti = document.getElementById('confetti-container');
  if (oldConfetti) oldConfetti.remove();

  // Create a container for confetti
  const confettiContainer = document.createElement('div');
  confettiContainer.id = 'confetti-container';
  confettiContainer.style.position = 'fixed';
  confettiContainer.style.left = '0';
  confettiContainer.style.top = '0';
  confettiContainer.style.width = '100vw';
  confettiContainer.style.height = '100vh';
  confettiContainer.style.pointerEvents = 'none';
  confettiContainer.style.zIndex = '300';
  document.body.appendChild(confettiContainer);

  // Confetti colors
  const colors = ['#FFC907', '#2E9DF7', '#8BD1CB', '#4FCB53', '#FF902A', '#F5402C', '#159A48', '#F16061'];

  // Create 60 confetti pieces
  for (let i = 0; i < 60; i++) {
    const conf = document.createElement('div');
    conf.style.position = 'absolute';
    conf.style.width = '12px';
    conf.style.height = '18px';
    conf.style.background = colors[Math.floor(Math.random() * colors.length)];
    conf.style.left = `${Math.random() * 100}vw`;
    conf.style.top = `-${Math.random() * 20 + 10}px`;
    conf.style.opacity = '0.85';
    conf.style.borderRadius = '3px';
    conf.style.transform = `rotate(${Math.random() * 360}deg)`;
    confettiContainer.appendChild(conf);

    // Animate each confetti piece
    const duration = 1800 + Math.random() * 1200;
    const translateX = (Math.random() - 0.5) * 200;
    const rotate = Math.random() * 720;

    conf.animate([
      { transform: conf.style.transform, top: conf.style.top, opacity: 0.85 },
      { transform: `translateX(${translateX}px) rotate(${rotate}deg)`, top: '100vh', opacity: 0.85 }
    ], {
      duration: duration,
      easing: 'ease-in'
    });
  }

  // Remove confetti after 2.5 seconds
  setTimeout(() => {
    confettiContainer.remove();
  }, 2500);
}

// Add a description and photo for each country
const countryDescriptions = {
  "Bangladesh": {
    desc: "Bangladesh is the tenth most densely populated country in the world. In rural areas, many people lack access to basic sanitation and proper drainage systems, which further contaminates their water sources. Waterborne diseases are a major threat here, but deep tube wells connected to piped systems bring clean, life-saving water to the surface.",
    img: "img/Bangladesh-photo.png"
  },
  "Bolivia": {
    desc: "Landlocked Bolivia has seen its share of internal conflict, including almost 200 coups and countercoups. It's one of the poorest and least-developed countries in South America. Almost half of the population lives below the poverty line, even more in rural or indigenous communities. Although there is water in the hills, it often takes hours to collect and gathers pollutants as it moves downhill.",
    img: "img/Bolivia-photo.png"
  },
  "Burkina Faso": {
    desc: "Burkina Faso is among the poorest countries in the world and is regularly ranked among the bottom ten countries in the UNDP Human Development Index. Diarrheal diseases are widespread and kill more than 9,900 children under 5 every year here. Infant mortality rates are as high as 75.32/1,000, while the average life expectancy is only 55.12 years. Although water and sanitation are considered among top national priorities, very little investment has been made in these vital services.",
    img: "img/Burkina-Faso-photo.png"
  },
  "Cambodia": {
    desc: "Cambodia has plenty of available groundwater; the problem is that not much of it is safe enough to drink. Here, we invest in the BioSand Filter (BSF), which uses stone, sand, and a biological layer to remove 99% of harmful bacteria in water poured through it. Families build their own BSF and keep it at their home for daily use, transforming overall health.",
    img: "img/Cambodia-photo.png"
  },
  "Central African Republic": {
    desc: "The people of the Central African Republic (CAR) face an extreme water crisis—and political instability and the lack of basic infrastructure presents major obstacles. Life expectancy is low; infant mortality rates are high. Access to clean and safe water is an essential need for the growth of the CAR and the health of its people.",
    img: "img/Central-African-Republic-photo.png"
  },
  "Cote d'Ivoire": {
    desc: "Côte d'Ivoire experienced civil wars at the turn of the century, which damaged water and sanitation infrastructure. Over 46% of the rural population lacks basic access to clean water and 87% lacks access to basic sanitation facilities. Access to safe water and sanitation is essential for Côte d'Ivoire and its people as they continue to rebuild.",
    img: "img/Cote-dIvoire-photo.png"
  },
  "Democratic Republic of the Congo": {
    desc: "The Democratic Republic of the Congo (DRC) is located in sub-Saharan Africa. It's the second largest country in Africa and is home to over 200 ethnic groups with nearly as many languages. It has been the stage for violent political conflicts for decades, and while the child mortality rate for kids under five years old is dropping across Central Africa, the DRC lags behind. We're working with schools and communities to install hand-pumps for clean water and introduce greater sanitation, two of the best ways to give kids better health and a better life.",
    img: "img/DRC-photo.png"
  },
  "Ethiopia": {
    desc: "Despite increasing total access to water sources from less than 15% to nearly 40% in the last 20 years, much of Ethiopia remains impoverished, with 60 million people lacking basic access to clean and safe water. Water projects here reduce disease burden and create transformational change in education, gender equality, and household income.",
    img: "img/Ethiopia-photo.png"
  },
  "Guatemala": {
    desc: "As the most populous country in Central America, Guatemala is home to over 16 million people. This multi-cultural country has a rich Mayan heritage and diversity, with over 24 linguistic groups. Most of the people live in rural areas, although more and more are migrating to the urban centers for work. Mountainous and lush, this tropical country is also prone to earthquakes, hurricanes, and volcanic eruptions. Over half of its population lives in poverty and there is a high risk of waterborne diseases including hepatitis A, typhoid fever, and bacterial diarrhea.",
    img: "img/Guatemala-photo.png"
  },
  "Haiti": {
    desc: "Haiti has been hampered by an unfortunate mix of unstable governments and natural disasters, from mudslides to earthquakes. More than a third of the country lacked access to safe water before the quake struck Port-au-Prince in 2010. When it did, thousands fled to the countryside and water sources quickly became overstressed and contaminated. Now, almost 80% of rural Haitians lack direct access to sanitation facilities, and only 40% have access to an improved water source. Haiti will be rebuilding for years, and sustainable clean water access is crucial for their recovery.",
    img: "img/Haiti-photo.png"
  },
  "Honduras": {
    desc: "Honduras is inextricably tied to the United States: almost 60% of its exports come to our country. Yet it is the second poorest nation in Central America, and nearly 65% of its population lives in poverty. Although mining is fruitful in the mountains, the industry leaches heavy metal into major waterways – including the country's primary source of drinking water. You have to dig deep here to get to clean water, so we're installing wells and protecting water at the source.",
    img: "img/Honduras-photo.png"
  },
  "India": {
    desc: "While India's economy continues to grow rapidly, hundreds of millions of people across the country still face poverty, unhygienic living conditions, malnutrition, and lack of access to clean water. Safe drinking water and improved sanitation can give these families a chance for healthier, happier lives.",
    img: "img/India-photo.png"
  },
  "Kenya": {
    desc: "Kenya’s beautiful landscape attracts lots of international visitors, but it's also a chronically water-scarce country. We’re working with our partners to protect sources and build wells, giving people life-saving access to clean water.",
    img: "img/Kenya-photo.png"
  },
  "Liberia": {
    desc: "Liberia is on the road to recovery after years of brutal civil war. But while the economy improves and HIV rates steadily reduce, diarrheal diseases are the second leading cause of death for children. Our solution in Liberia is to rehabilitate old water projects that have broken down since the war. We also train communities to practice safe hygiene and maintain their own projects for years to come.",
    img: "img/Liberia-photo.png"
  },
  "Madagascar": {
    desc: "Madagascar ranks among the least developed countries in the world. It’s prone to frequent flooding and climate events that further contaminate water sources and damage existing infrastructure. To improve water access in Madagascar, we’re funding large, piped systems to bring high-quality water services and a better standard of life to families in need.",
    img: "img/Madagascar-photo.png"
  },
  "Malawi": {
    desc: "Malawi is one of Africa's most densely populated and least developed countries. Most people live in rural areas where water is scarce. As a result, many women and children spend hours of their day walking to collect it. Access to clean drinking water and improved sanitation drastically reduces the risk of water-related diseases and gives hours of time back to women and children.",
    img: "img/Malawi-photo.png"
  },
  "Mali": {
    desc: "Mali is a landlocked country with vast deserts and a long dry season where many people lack access to clean water and sanitation. It's one of the poorest countries in the world and has both a high risk of infectious disease and one of the world’s highest infant mortality rates. For families in Mali, the first step out of poverty begins with clean water.",
    img: "img/Mali-photo.png"
  },
  "Mozambique": {
    desc: "Mozambique underwent a civil war that led to extreme poverty and severely unhealthy living conditions. In addition, floods and earthquakes exacerbate the growing water crisis. Recently, Mozambique has made incredible strides toward development, and providing access to clean water is a major priority.",
    img: "img/Mozambique-photo.png"
  },
  "Nepal": {
    desc: "Nepal is known for its beautiful Himalayan Mountains, deep valleys, and richly flowing streams. But many of its water sources are not only far, they're difficult and dangerous to access in the mountainous terrain. Clean water projects in Nepal improve access to safe drinking water, shorten time spent walking for water, and benefit overall health in the communities we serve.",
    img: "img/Nepal-photo.png"
  },
  "Niger": {
    desc: "As the largest country in West Africa, Niger has over three billion cubic meters of drinkable water available underground. The problem is, few can afford to build systems to bring it to the surface. Between the desert landscape and shortage of clean water, farming—and life—are difficult in Niger. Water solutions like drilled wells and piped systems are essential for health and wellbeing.",
    img: "img/Niger-photo.png"
  },
  "Pakistan": {
    desc: "Pakistan is the seventh most populated country in the world. With urbanization quickly on the rise and one-third of the population already living in urban areas, the need for water, sanitation, and hygiene programs is greater than ever. Floods are a common occurrence affecting millions of people, contaminating water sources and displacing families. Access to clean water and improved sanitation can help lower disease, poverty, and conflict throughout Pakistan, leading to happier and healthier lives.",
    img: "img/Pakistan-photo.png"
  },
  "Rwanda": {
    desc: "Rwanda is still recovering from the horrific 1994 genocide, which left more than 800,000 people dead and pushed many more from their homes. Since then, a progressive government and growing economy have helped stabilize the country, but waterborne disease remains a leading cause of death. Clean water is essential for overall health and continued progress in Rwanda.",
    img: "img/Rwanda-photo.png"
  },
  "Senegal": {
    desc: "We’re working in the Casamance region of Senegal, an area that has fallen behind the rest of the country in terms of water access due to decades of conflict. Though a ceasefire was declared in 2014, Senegal still falls near the bottom of the UN Human Development Index, with access to clean water standing at 75% and access to basic sanitation at 48%. But the country is working to change that. Today, they're investing in partnerships with implementers like charity: water to co-fund large schemes under the motto One Roof, One Tap. In addition to providing a reliable source of clean water, these private, household connections give time back to the women and children traditionally responsible for collecting water.",
    img: "img/Senegal-photo.png"
  },
  "Sierra Leone": {
    desc: "In 2014, the Ebola crisis hit Sierra Leone and massively impacted economic growth. The country is one of the world's poorest. Mortality rates are high, especially among children, and are often due to waterborne illnesses. But these diseases are preventable with clean water sources and good hygiene practices, both of which are becoming a reality for Sierra Leone.",
    img: "img/Sierra-Leone-photo.png"
  },
  "Tanzania": {
    desc: "Tanzania is one of the largest countries in Africa, but almost half of its 53.4 million people live on less than $1.90 per day. Life expectancy is just 61.71 years. Investment in water and sanitation lags well behind the projected need for Tanzania’s growing population. To meet demand, we're building new wells, rehabilitating existing structures, and installing hygienic block latrines. ",
    img: "img/Tanzania-photo.png"
  },
  "Uganda": {
    desc: "With a refugee rate that has almost doubled since 2015 as a result of conflict in neighboring countries and quality issues with groundwater, over 60% of Uganda’s population lacks basic access to clean and safe water. In addition, internally displaced families in Northern Uganda are returning home after years away. Clean water projects can improve health, shorten the time spent walking for water, and even help rebuild communities after years of displacement.",
    img: "img/Uganda-photo.png"
  }
};
