class CreateFlow {
    constructor() {
        this.homeContent = document.getElementById('homeContent');
        this.createContent = document.getElementById('createContent');
        this.createBtn = document.getElementById('createBtn');
        this.promptInput = document.getElementById('promptInput');
        this.selectionSummary = document.getElementById('selectionSummary');

        this.isCreateMode = false;
        this.selectedTemplate = null;

        this.init();
    }

    init() {
        // Toggle between home and create flow
        this.createBtn.addEventListener('click', () => this.toggleCreateFlow());

        // Template stack expansion
        const stackHeaders = document.querySelectorAll('.stack-header');
        stackHeaders.forEach(header => {
            header.addEventListener('click', (e) => {
                const stack = e.currentTarget.closest('.template-stack');
                this.toggleStack(stack);
            });
        });

        // Template selection
        const templateCards = document.querySelectorAll('.template-card');
        templateCards.forEach(card => {
            card.addEventListener('click', (e) => {
                this.selectTemplate(e.currentTarget);
            });
        });

        // Empty board option
        const emptyBoard = document.querySelector('.empty-board');
        emptyBoard.addEventListener('click', () => {
            this.selectTemplate(emptyBoard, 'Empty Board');
        });

        // Prompt input refinement
        this.promptInput.addEventListener('input', (e) => {
            if (this.isCreateMode && e.target.value) {
                this.updatePromptRefinement(e.target.value);
            }
        });

        // Enter key to create
        this.promptInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && this.selectedTemplate) {
                this.createBoard();
            }
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
            this.promptInput.placeholder = 'Describe what you want to create...';
        } else {
            // Switch back to home
            this.createContent.classList.remove('active');
            setTimeout(() => {
                this.homeContent.classList.add('active');
            }, 200);
            this.createBtn.classList.remove('active');
            this.createBtn.textContent = '+ Create';
            this.promptInput.placeholder = 'What shall we do next?';
            this.selectionSummary.classList.remove('visible');
            this.selectedTemplate = null;

            // Reset stacks
            document.querySelectorAll('.template-stack').forEach(stack => {
                stack.classList.remove('expanded');
            });

            // Reset selections
            document.querySelectorAll('.template-card').forEach(card => {
                card.classList.remove('selected');
            });
        }
    }

    toggleStack(stack) {
        const wasExpanded = stack.classList.contains('expanded');

        // Collapse all other stacks
        document.querySelectorAll('.template-stack').forEach(s => {
            if (s !== stack) {
                s.classList.remove('expanded');
            }
        });

        // Toggle this stack
        if (wasExpanded) {
            stack.classList.remove('expanded');
        } else {
            stack.classList.add('expanded');
        }
    }

    selectTemplate(element, customName = null) {
        // Remove previous selections
        document.querySelectorAll('.template-card').forEach(card => {
            card.classList.remove('selected');
        });

        // Add selection
        if (!customName) {
            element.classList.add('selected');
            this.selectedTemplate = element.dataset.template;
        } else {
            this.selectedTemplate = customName;
        }

        // Show selection summary
        this.updateSelectionSummary(customName || element.textContent);
    }

    updateSelectionSummary(templateName) {
        this.selectionSummary.innerHTML = `
            <h3>Creating:</h3>
            <div class="selected-item">${templateName}</div>
            <button onclick="createFlow.createBoard()">Create Board</button>
        `;
        this.selectionSummary.classList.add('visible');
    }

    updatePromptRefinement(text) {
        // Visual feedback that prompt is being used to refine
        if (this.selectedTemplate) {
            this.selectionSummary.innerHTML = `
                <h3>Creating:</h3>
                <div class="selected-item">${this.selectedTemplate}</div>
                <div style="font-size: 13px; color: #8b8b8b; margin-top: 8px; line-height: 1.4;">
                    "${text}"
                </div>
                <button onclick="createFlow.createBoard()">Create Board</button>
            `;
        }
    }

    createBoard() {
        // Simulate board creation
        alert(`Creating board: ${this.selectedTemplate}\n\nWith refinement: "${this.promptInput.value || 'none'}"`);

        // Reset
        this.toggleCreateFlow();
        this.promptInput.value = '';
    }
}

// Initialize
let createFlow;
document.addEventListener('DOMContentLoaded', () => {
    createFlow = new CreateFlow();
});
