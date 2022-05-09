function tabs(itemTabs, tabContent, tabParent, tabsActive) {
  let tabs = document.querySelectorAll(itemTabs),
    tabsContent = document.querySelectorAll(tabContent),
    tabsParent = document.querySelector(tabParent);

  function hideTabContent() {

    tabsContent.forEach((item) => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
      item.classList.remove(tabsActive);
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.add('show', 'fade');
    tabsContent[i].classList.remove('hide');
    tabs[i].classList.add(tabsActive);
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', function (event) {
    const target = event.target;
    if (target && target.classList.contains(itemTabs.slice(1))) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
}

export default tabs;