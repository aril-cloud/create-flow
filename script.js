class CreateFlow {
    constructor() {
        this.homeContent = document.getElementById('homeContent');
        this.createContent = document.getElementById('createContent');
        this.createBtn = document.getElementById('createBtn');
        this.promptInput = document.getElementById('promptInput');

        this.isCreateMode = false;

        this.init();
    }

    init() {
        // Toggle between home and create flow
        this.createBtn.addEventListener('click', () => this.toggleCreateFlow());

        // Stack card clicks
        const stackCards = document.querySelectorAll('.stack-card');
        stackCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const type = e.currentTarget.dataset.type;
                this.selectStack(type);
            });
        });
    }

    toggleCreateFlow() {
        this.isCreateMode = !this.isCreateMode;

        if (this.isCreateMode) {
            // Switch to create flow
            this.homeContent.classList.remove('active');
            setTimeout(() => {
                this.createContent.classList.add('active');
            }, 200);
            this.createBtn.classList.add('active');
            this.createBtn.textContent = '← Back';
            this.promptInput.placeholder = 'Describe what you want to create or tap a stack...';
        } else {
            // Switch back to home
            this.createContent.classList.remove('active');
            setTimeout(() => {
                this.homeContent.classList.add('active');
            }, 200);
            this.createBtn.classList.remove('active');
            this.createBtn.textContent = '+ Create';
            this.promptInput.placeholder = 'What shall we do next?';
        }
    }

    selectStack(type) {
        console.log('Selected stack:', type);
        // Next step would be to show specific templates from this stack
        // For now, just show feedback in prompt
        this.promptInput.value = `Creating ${type} board...`;
        this.promptInput.focus();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new CreateFlow();
});
