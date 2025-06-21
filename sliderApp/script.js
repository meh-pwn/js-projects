const images = [
    "https://placehold.co/800x400?text=Slide+1",
    "https://placehold.co/800x400?text=Slide+2",
    "https://placehold.co/800x400?text=Slide+3",
    "https://placehold.co/800x400?text=Slide+4",
    "https://placehold.co/800x400?text=Slide+5",
]

const slider = document.querySelector("[data-slider]");
const prevBtn = document.querySelector("[data-prev-btn]");
const nextBtn = document.querySelector("[data-next-btn]");

let currentIndex = 0;

const setupSlides = () => {
    images.forEach((imageUrl, index) => {
        const img = document.createElement("img");
        img.classList.add("image");
        img.src = imageUrl;
        img.dataset.index = index;
        img.alt = `Slide ${index + 1}`;

        slider.appendChild(img);
    })

    const firstClone = slider.firstElementChild.cloneNode(true);
    const lastClone = slider.lastElementChild.cloneNode(true);

    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slider.firstElementChild);
}

const initSlider = () => {
    const slideWidth = slider.firstElementChild.offsetWidth;
    
    slider.style.transition = `translate 0.5s ease-in-out`;
    slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;
}

const goToNextBtn = () => {
    const slideWidth = slider.firstElementChild.offsetWidth;

    currentIndex++;

    slider.style.transition = `translate 0.5s ease-in-out`;
    slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;

    if (currentIndex >= images.length) {
        nextBtn.disabled = true;
    }

    slider.addEventListener(
        "transitionend",
        () => {
            if (currentIndex >= images.length) {
                currentIndex = 0;
                slider.style.transition = "none";
                slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;
                 nextBtn.disabled = false;
            }
        },
        {once: true}
    )
}

const goToPrevBtn = () => {
    const slideWidth = slider.firstElementChild.offsetWidth;

    currentIndex--;

    slider.style.transition = `translate 0.5s ease-in-out`;
    slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;

    slider.addEventListener(
        "transitionend",
        () => {
            if (currentIndex < 0) {
                currentIndex = images.length - 1;
                slider.style.transition = "none";
                slider.style.translate = `-${slideWidth * (currentIndex + 1)}px`;
            }
        },
        {once: true}
    )
}

nextBtn.addEventListener("click", goToNextBtn);
prevBtn.addEventListener("click", goToPrevBtn);
setupSlides();
initSlider();