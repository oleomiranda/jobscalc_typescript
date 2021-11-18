export default function Modal({ animateClasses = [] }: animate) {

	const wrapper = document.querySelector('.modal-wrapper') as HTMLDivElement
	const element = document.querySelector('.modal') as HTMLDivElement
	const cancelButton = element.querySelector("footer .button:nth-child(1)") as HTMLButtonElement

	cancelButton.addEventListener('click', close)


	function open() {
		document.addEventListener('keydown', closeOnEscape)
		wrapper.classList.add('on')
		element.classList.add(...animateClasses)
	}

	function close() {
		document.removeEventListener('keydown', closeOnEscape)
		wrapper.classList.remove('on')
		element.classList.remove(...animateClasses)
	}

	function closeOnEscape({ key }: KeyboardEvent) {
		if (key == 'Escape') {
			close()
		}
	}

	return {
		open,
		close
	}
}


interface animate {
	animateClasses: Array<string>
}