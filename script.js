class Slider {
  /////////////////////////////
  // private Props && methods
  /////////////////////////////
  static slideTime = 0;
  static prevCase = false;
  
  /////////////////////////////
  // Public Props && methods
  /////////////////////////////
  constructor(slider, autoPlay) {
    // Slider Selector
    this.slider = $(slider);
    this.slidesContainer = $(slider).querySelector('.slides');
    this.slides = this.slider.querySelectorAll('.item');

    //Navigation Arrows
    this.navPrev = $(slider).querySelector('.prev');
    this.navNext = $(slider).querySelector('.next');

    //Config
    this.autoPlay = autoPlay;

    ////////////////////
    // Run By Default
    ////////////////////
    if (this.isSliderVisible) {
      //  Navigation
      this.onNavigateClick();

      // Hover
      this.onHover();

      // AutoPlay
      if (this.autoPlay) return this.autoPlayStart();
    } else {
      Slider.slideTime = 0;
      this.autoPlayStop();
    }
  }
  /////////////////////
  // Checking ....
  /////////////////////

  // if slider is visible in the viewport
  get isSliderVisible() {
    return this.slider.closest('.active') && this.slider.offsetTop < 100;
  }
  /////////////////////
  // Handle items
  /////////////////////

  // Get ActiveItem
  get activeItemSelector() {
    const activeItems = this.slider.querySelectorAll('.active');
    return activeItems[activeItems.length - 1];
  }
  // set items
  handleItems() {
    this.firstItem = this.slides[0];
    this.lastItem = this.slides[this.slides.length - 1];
    this.activeItem = this.activeItemSelector;
    this.currentListItem = this.activeItem || this.firstItem;
    this.nextListItem = this.currentListItem.nextElementSibling;
    this.prevListItem = this.currentListItem.previousElementSibling;
  }

  // setTargetItem
  setTargetItem() {
    if (Slider.prevCase)
      this.targetListItem = this.prevListItem || this.lastItem;
    else this.targetListItem = this.nextListItem || this.firstItem;
  }

  // reset items
  resetItems() {
    this.slides.forEach((e) => e.classList.remove('active'));
  }

  /////////////////////
  // Sliding
  /////////////////////
  sliding() {
    // Handle items
    this.handleItems();

    // reset Slider
    this.resetItems();

    // Set Target Item
    this.setTargetItem();

    // set active List && Sections
    this.targetListItem.classList.add('active');
  }
  /////////////////////
  // autoPlay
  /////////////////////

  // Start
  autoPlayStart() {
    Slider.slideTime = 0;
    if (this.isSliderVisible)
      Slider.slideTime = setInterval(() => this.sliding(), 7000);
  }

  // Stop
  autoPlayStop() {
    clearInterval(Slider.slideTime);
  }
  /////////////////////
  // Navigation
  /////////////////////

  // prev
  goPrev() {
    this.autoPlayStop();
    Slider.prevCase = true;
    this.sliding();
  }

  // next
  goNext() {
    this.autoPlayStop();
    Slider.prevCase = false;
    this.sliding();
  }

  // navigate Click
  onNavigateClick() {
    if (this.navPrev) this.navPrev.onclick = () => this.goPrev();
    if (this.navNext) this.navNext.onclick = () => this.goNext();
  }

  /////////////////////
  // Hover
  /////////////////////
  onHover() {
    this.slidesContainer.onmousemove = () => this.autoPlayStop();
    this.slidesContainer.onmouseleave = () => this.autoPlayStart();
  }
}
