/********* create variables *********/
// useful variables might be: the cost per day, the number of days selected, and elements on the screen that will be clicked or will need to be modified. 
// Do any of these variables need to be initialized when the page is loaded? 
// When do they need to be reset or updated?


/********* colour change days of week *********/
// when the day buttons are clicked, we will apply the "clicked" class to that element, and update any other relevant variables. Then, we can recalculate the total cost.
// added challenge: don't update the dayCounter if the same day is clicked more than once. hint: .classList.contains() might be helpful here!


  


/********* clear days *********/
// when the clear-button is clicked, the "clicked" class is removed from all days, any other relevant variables are reset, and the calculated cost is set to 0.


// when the half-day button is clicked, set the daily rate to $20, add the "clicked" class to the "half" element, remove it from the "full" element, and recalculate the total cost.



 

// when the full-day button is clicked, the daily rate is set back to $35, the clicked class is added to "full" and removed from "half", and the total cost is recalculated.



/********* calculate *********/
// when a calculation is needed, set the innerHTML of the calculated-cost element to the appropriate value


/********* Create Variables *********/
const FULL_DAY_COST = 40;
const HALF_DAY_COST = 20;

let selectedDays = [];
let currentRate = 'half';

/********* Utility Functions *********/

// Update total cost display
const updateTotalCost = (amount) => {
  const costDisplay = document.getElementById('calculated-cost');
  if (costDisplay) {
    costDisplay.textContent = `${amount}`;
  }
};

// Calculate total cost
const calculateTotal = () => {
  const rateValue = currentRate === 'full' ? FULL_DAY_COST : HALF_DAY_COST;
  const total = selectedDays.length * rateValue;
  updateTotalCost(total);
};

// Change rate and update button styles
const changeRate = (rate) => {
  currentRate = rate;

  const fullBtn = document.getElementById('full');
  const halfBtn = document.getElementById('half');

  if (rate === 'full') {
    fullBtn.classList.add('clicked');
    halfBtn.classList.remove('clicked');
  } else {
    halfBtn.classList.add('clicked');
    fullBtn.classList.remove('clicked');
  }

  calculateTotal();
};

/********* Day Selection *********/
document.addEventListener('', () => {
  const dayElements = document.querySelectorAll('.day-selector li');

  dayElements.forEach((day) => {
    day.addEventListener('click', function () {
      const dayId = this.id;

      this.classList.toggle('clicked');

      if (this.classList.contains('clicked')) {
        if (!selectedDays.includes(dayId)) {
          selectedDays.push(dayId);
        }
      } else {
        selectedDays = selectedDays.filter(d => d !== dayId);
      }

      calculateTotal();
    });
  });

  /********* Clear Days *********/
  const clearButton = document.getElementById('clear-button');
  clearButton.addEventListener('click', () => {
    // Remove clicked class from all days
    dayElements.forEach((day) => {
      day.classList.remove('clicked');
    });

    // Reset state
    selectedDays = [];
    changeRate('half'); 
  });

  /********* Rate Buttons *********/
  const halfBtn = document.getElementById('half');
  const fullBtn = document.getElementById('full');

  halfBtn.addEventListener('click', () => {
    if (currentRate !== 'half') {
      changeRate('half');
    }
  });

  fullBtn.addEventListener('click', () => {
    if (currentRate !== 'full') {
      changeRate('full');
    }
  });

  /********* Initial Setup *********/
  changeRate('half');      
  updateTotalCost(0);      
});
