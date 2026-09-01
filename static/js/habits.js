(() => {
  const now = new Date();
  const day = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
  ].join('-');
  const storageKey = 'daily-habits';
  let checked = new Set();

  try {
    const saved = JSON.parse(localStorage.getItem(storageKey));
    if (saved?.day === day && Array.isArray(saved.checked)) {
      checked = new Set(saved.checked);
    }
  } catch (_) {
    // Ignore unavailable or malformed browser storage.
  }

  function render(button) {
    const isChecked = checked.has(button.dataset.habit);
    button.classList.toggle('line-through', isChecked);
    button.classList.toggle('opacity-65', isChecked);
    button.setAttribute('aria-pressed', String(isChecked));
    button.querySelector('span').textContent = isChecked ? '[x]' : '[ ]';
  }

  document.querySelectorAll('#habits [data-habit]').forEach((button) => {
    render(button);
    button.addEventListener('click', () => {
      const habit = button.dataset.habit;
      checked.has(habit) ? checked.delete(habit) : checked.add(habit);
      render(button);
      try {
        localStorage.setItem(storageKey, JSON.stringify({ day, checked: [...checked] }));
      } catch (_) {
        // The tracker still works for this page load when storage is unavailable.
      }
    });
  });
})();
