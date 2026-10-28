// ------------------- SLIDERS -------------------

const daysSlider = document.getElementById('daysSlider');
const daysSliderValue = document.getElementById('daysSliderValue');

const sleepSlider = document.getElementById('sleepSlider');
const sleepSliderValue = document.getElementById('sleepSliderValue');

// Update and save on input
daysSlider.addEventListener('input', updateSchedule);
sleepSlider.addEventListener('input', updateSchedule);

function updateSchedule() {
  daysSliderValue.textContent = daysSlider.value;
  sleepSliderValue.textContent = Number(sleepSlider.value).toFixed(2).replace(/\.00$/, '').replace(/0$/, '');
  localStorage.setItem('daysSliderValue', daysSlider.value);
  localStorage.setItem('sleepSliderValue', sleepSlider.value);
  setSleep();
}

// Restore saved values and update display
window.addEventListener('DOMContentLoaded', () => {
  const savedDays = localStorage.getItem('daysSliderValue');
  if (savedDays != null) daysSlider.value = savedDays;

  const savedSleep = localStorage.getItem('sleepSliderValue');
  if (savedSleep != null) sleepSlider.value = savedSleep;

  updateSchedule();
});

// -------------- SCHEDULE -----------------

const schedule = document.getElementById('schedule');


// Make one block for each 15-minute interval in the day.
function generateSchedule() {
  schedule.innerHTML = '';
  for (let i = 0; i < 96; i++) {
    const block = document.createElement('div');
    block.classList.add('block');
    block.dataset.slot = i;
    const formatTime = slot => `${String(Math.floor(slot / 4)).padStart(2, '0')}:${String((slot % 4) * 15).padStart(2, '0')}`;
    block.title = `${formatTime(i)}–${formatTime(i + 1)}`;
    schedule.appendChild(block);
  }
}

  ///////////////////////////////////////////////////////////////////////////////////////////////////
 // gotta switch it up a bit so the slider only go to times evenly divisible into one 24-hour day //
///////////////////////////////////////////////////////////////////////////////////////////////////

// make array of viable values and index that with slider value
function setSleep() {
  const blocks = schedule.children;
  const totalSlots = blocks.length;
  const days = Number(daysSlider.value);
  const sleepSlots = Number(sleepSlider.value) * 4;

  for (let day = 0; day < days; day++) {
    const start = Math.ceil(day * totalSlots / days);
    const end = Math.ceil((day + 1) * totalSlots / days);
    const sleepInDay = Math.round(end * sleepSlots / totalSlots) - Math.round(start * sleepSlots / totalSlots);
    for (let slot = start; slot < end; slot++) {
      blocks[slot].classList.toggle('sleep', slot - start < sleepInDay);
    }
  }
}

generateSchedule();
setSleep();
