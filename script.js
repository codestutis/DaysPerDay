
// ------------------- DAYS SLIDER -------------------

const daysSlider = document.getElementById('daysSlider');
const daysSliderValue = document.getElementById('daysSliderValue');

daysSlider.addEventListener('input', () => {
  daysSliderValue.textContent = daysSlider.value;
});

daysSlider.addEventListener('input', setSleep);


// ----------------- SLEEP SLIDER -------------------

const sleepSlider = document.getElementById('sleepSlider');
const sleepSliderValue = document.getElementById('sleepSliderValue');

sleepSlider.addEventListener('input', () => {
  sleepSliderValue.textContent = sleepSlider.value;
});

sleepSlider.addEventListener('input', setSleep);

// -------------- SCHEDULE -----------------

const schedule = document.getElementById('schedule');


// make 24 divs inside the schedule element for each hour
function generateSchedule() {
  schedule.innerHTML = '';
  for (let i = 0; i < 24; i++) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.id = `${i}`;
    schedule.appendChild(block);
  }
}

  ///////////////////////////////////////////////////////////////////////////////////////////////////
 // gotta switch it up a bit so the slider only go to times evenly divisible into one 24-hour day //
///////////////////////////////////////////////////////////////////////////////////////////////////

// make array of viable values and index that with slider value
function setSleep() {
  const blocks = document.querySelectorAll('.block');
  blocks.forEach(block => block.classList.remove('sleep'));

  // total sleep time per 24-hours
  const sleepTotal = parseInt(sleepSlider.value);

  // how many pseudo days per regular day
  const daysPerDay = parseInt(daysSlider.value);

  // sleep per pseudo day
  const sleepPerDay = Math.round(sleepTotal / daysPerDay);

  // hours per pseudo day
  const hoursPerDay = Math.floor(24 / daysPerDay);

  for (let d = 0; d < daysPerDay; d++) {
    const dayStart = d * hoursPerDay;

    // fill in the sleep time for each day
    for (let i = 0; i < sleepPerDay; i++) {
      const hourIndex = dayStart + i;
      if (hourIndex < 24) {
        const block = document.getElementById(`${hourIndex}`);
        if (block) block.classList.add('sleep');
      }
    }
  }
}


generateSchedule();
setSleep();
