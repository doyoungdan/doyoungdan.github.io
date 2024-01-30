class SlideStories {
    /** @param {string} id */
    constructor(id) {
        this.slide = document.querySelector(`[data-slide=${id}]`);
        this.active = 0;
        this.timeout = null;  // timeout 변수를 초기화
        this.next = this.next.bind(this); // 바인딩 추가
        this.prev = this.prev.bind(this); // 바인딩 추가
        this.init();
    }

    /** @param {Number} index */
    activeSlide(index) {
        this.active = index
        this.items.forEach((item) => item.classList.remove('active'))
        this.items[index].classList.add('active')
        this.thumbItems.forEach((item) => item.classList.remove('active'))
        this.thumbItems[index].classList.add('active')
        this.autoSlide()
    }

    next() {
        if (this.active < this.items.length - 1) {
            this.activeSlide(this.active + 1)
        } else {
            this.activeSlide(0)
        }
    }

    prev() {
        if (this.active > 0) {
            this.activeSlide(this.active - 1)
        } else {
            this.activeSlide(this.items.length - 1)
        }
    }

    addNavigation() {
        const nextBtn = this.slide.querySelector('.slide-next')
        const prevBtn = this.slide.querySelector('.slide-prev')
        nextBtn.addEventListener('click', this.next)
        prevBtn.addEventListener('click', this.prev)
    }

    autoSlide() {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(this.next, 8000)
    }

    addThumbItems() {
        // 기존 thumbItems를 초기화
        this.thumb.innerHTML = '';

        // 슬라이드의 갯수만큼 thumb 요소 추가
        this.items.forEach(() => (this.thumb.innerHTML += `<span class="slide-thumb-item"></span>`));
        this.thumbItems = Array.from(this.thumb.children);
    }

    init() {
        this.items = this.slide.querySelectorAll('.slide-items > *');
        this.thumb = this.slide.querySelector('.slide-thumbs');

        // 기존 thumbItems를 초기화
        this.thumbItems = [];

        this.addThumbItems();
        this.addNavigation();
        this.activeSlide(0);
    }

    stop() {
        clearTimeout(this.timeout);
        // 추가로 필요한 중단 로직을 여기에 추가할 수 있습니다.
    }
}

$(document).ready(function () {
    // SlideStories 인스턴스 생성
    slideStoriesInstance = new SlideStories('slide');

    // #highlightOpen을 클릭할 때의 이벤트 핸들러
    $("#highlightOpen").on("click", function () {
        // #highlightModal에 on 클래스를 추가
        $("#highlightModal").addClass("on");

        // on 클래스가 추가되면 SlideStories 인스턴스를 초기화
        if ($("#highlightModal").hasClass("on")) {
            slideStoriesInstance.init();
        }
    });

    // #highlightClose을 클릭할 때의 이벤트 핸들러
    $("#highlightClose").on("click", function () {
        // #highlightModal에 on 클래스를 제거
        $("#highlightModal").removeClass("on");

        // SlideStories 인스턴스를 중단 및 초기화
        slideStoriesInstance.stop();
    });
});

$(document).ready(function () {
    let slideStoriesInstance = new SlideStories('slide');

    // #highlightOpen을 클릭할 때의 이벤트 핸들러
    $("#highlightOpen").on("click", function () {
        $("#highlightModal").addClass("on");
        if ($("#highlightModal").hasClass("on")) {
            slideStoriesInstance.init();
        }
    });

    // #highlightClose을 클릭할 때의 이벤트 핸들러
    $("#highlightClose").on("click", function () {
        $("#highlightModal").removeClass("on");
        slideStoriesInstance.stop();
    });

    // #storyOpen을 클릭할 때의 이벤트 핸들러
    $("#storyOpen").on("click", function () {
        $("#storyModal").addClass("on");
        
        // storyModal이 열리면 storyStoriesInstance 인스턴스를 초기화
        if ($("#storyModal").hasClass("on")) {
            // 새로운 인스턴스를 생성하도록 수정
            let storyStoriesInstance = new SlideStories('story');
            storyStoriesInstance.init();
        }
    });

    // #storyModalClose 클릭할 때의 이벤트 핸들러
    $("#storyModalClose").on("click", function () {
        $("#storyModal").removeClass("on");
        // storyStoriesInstance 인스턴스를 중단 및 초기화
        storyStoriesInstance.stop();
    });
});

// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {

    // Select all elements with the class "image-container" within the document
    const imageContainers = document.querySelectorAll('.image-container');
  
    // Iterate over each container to manipulate its contents
    imageContainers.forEach((container) => {
  
      // Extract the original image element within the container
      const originalImage = container.querySelector('img');
  
      // Retrieve the source URL of the original image
      const originalImageSrc = originalImage.src;
  
      // Create a new image element with the same source and add the "bg" class
      const backgroundImage = document.createElement('img');
      backgroundImage.src = originalImageSrc;
      backgroundImage.classList.add('bg');
  
      // Insert the new image element before the original image within the container
      container.prepend(backgroundImage);
    });
  });