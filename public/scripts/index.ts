import Modal from "./modal.js";

const modal = Modal({animateClasses: ['animate-pop', 'back']})

const cards = document.querySelectorAll('.cards .card')
const deleteForm = document.querySelectorAll('#delete-job') as unknown as HTMLElement

for(let card of cards){
	if(card instanceof HTMLElement){
		var cardId = card.dataset.id
	}

	const deleteButton = card.querySelector('button.delete')
	
	deleteButton!.addEventListener('click', () => {
		modal.open()
		deleteForm.setAttribute('action', '/job/delete/' + cardId) 
	})
}