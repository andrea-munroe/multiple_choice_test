const modal = document.getElementById('name-modal');
const modalOpen = document.getElementById('student-btn');
const modalClose = document.getElementById('modal-close');

modalOpen.addEventListener('click', () => {
	modal.showModal();
})

modalClose.addEventListener('click', () => {
	modal.close()
})