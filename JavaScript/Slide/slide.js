const d = window.document;
function each(list, func) {
	for (let i = 0, len = list.length; i < len; i++) {
		func(list[i], i, list);
	}
}
function filter(list, predi) {
	let result = [];
	each(list, (item, i, list) => {
		if (predi(item, i, list)) result.push(item);
	});
	return result;
}
d.addEventListener("DOMContentLoaded", () => {
	const slideWrap = d.querySelector(".container"),
		slideContainer = d.querySelector(".slider-container"),
		slides = d.querySelectorAll(".slide"),
		navPrev = d.querySelector("#prev"),
		navNext = d.querySelector("#next"),
		pager = d.querySelector(".pager");

	let slideHeight = 0,
		currentIndex = 0,
		timer = undefined;

	slideContainer.classList.add("animated");
	function goToSlide(idx) {
		slideContainer.style.left = -100 * idx + "%";
		currentIndex = idx;
		each(
			filter(pagerBtns, (pagerBtn, i) => i !== idx),
			otherBtn => {
				otherBtn.classList.remove("active");
			}
		);
		pagerBtns[idx].classList.add("active");
	}
	function startAutoSlide() {
		timer = setInterval(() => {
			let nextIdx = (currentIndex + 1) % slides.length;
			goToSlide(nextIdx);
		}, 1000);
	}
	function stopAutoSlide() {
		clearInterval(timer);
	}
	/* 슬라이드의 높이 확인하여 부모의 높이로 지정하기 */
	/* 대상.offsetHeight */
	// /* 슬라이드가 있으면 가로로 배열하기 */
	each(slides, (slide, i) => {
		if (slideHeight < slide.offsetHeight) slideHeight = slide.offsetHeight;
		slide.style.left = i * 100 + "%";
		pager.innerHTML += `<span data-idx="${i}">${i}</span>`;
	});
	slideWrap.style.height = slideHeight + "px";
	slideContainer.style.height = slideHeight + "px";
	const pagerBtns = d.querySelectorAll(".pager span");
	goToSlide(0);
	/* 버튼 기능 업데이트 함수 */
	navPrev.addEventListener("click", () => {
		console.log("currentIndex", currentIndex);
		if (currentIndex === 0) {
			goToSlide(slides.length - 1);
		} else {
			goToSlide(currentIndex - 1);
		}
	});
	navNext.addEventListener("click", () => {
		console.log("currentIndex", currentIndex);
		if (currentIndex === slides.length - 1) {
			goToSlide(0);
		} else {
			goToSlide(currentIndex + 1);
		}
	});
	/* 자동 슬라이드 */
	startAutoSlide();
	/* 마우스가 슬라이드 위에 있을 때 멈추기 */
	slideWrap.addEventListener("mouseenter", () => {
		stopAutoSlide();
		console.log(timer);
	});
	slideWrap.addEventListener("mouseleave", () => {
		startAutoSlide();
		console.log(timer);
	});
	/* 페이저로 슬라이드 이동하기 */
	each(pagerBtns, pagerBtn => {
		pagerBtn.addEventListener("click", event => {
			const thisBtn = event.target;
			/* 속성이용 */
			// console.log(event.target.getAttribute("data-idx"));
			// let pagerNum = event.target.getAttribute("data-idx");
			// goToSlide(pagerNum);
			/* 값 이용 */
			let pagerNum = thisBtn.innerText;
			goToSlide(pagerNum);
			/* 클릭된 그 요소에만 active 추가 */
			//모든 pagerbtn에 active 제거, 클릭된 그 요소에만 active 추가
			each(
				filter(pagerBtns, btn => btn !== event.target),
				otherBtn => {
					otherBtn.classList.remove("active");
				}
			);
			thisBtn.classList.add("active");
		});
	});
});
