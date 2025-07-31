// src/lib/utils/onClickOutside.ts 
// Utility per chiudere un dropdown cliccando fuori
export function onClickOutside(callback: () => void, getElement: () => HTMLElement | null) {
    function handleClick(event: MouseEvent) {
      const el = getElement();
      if (el && !el.contains(event.target as Node)) {
        callback();
      }
    }
  
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }
  