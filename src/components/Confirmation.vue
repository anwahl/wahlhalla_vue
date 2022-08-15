<template>
    <transition name="fade">
        <div class="popup-modal" v-if="isVisible">
            <div class="window">
                <h2 style="margin-top: 0">{{ title }}</h2>
                <p>{{ message }}</p>
                <div class="btns">
                    <button class="cancel-btn" @click="_cancel">{{ cancelButton }}</button>
                    <span class="ok-btn" @click="_confirm">{{ okButton }}</span>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    name: 'confirmation-dialogue',

    data: () => ({
        // Parameters that change depending on the type of dialogue
        title: undefined,
        message: undefined, // Main text content
        okButton: undefined, // Text for confirm button; leave it empty because we don't know what we're using it for
        cancelButton: 'Go Back', // text for cancel button
        
        // Private variables
        resolvePromise: undefined,
        rejectPromise: undefined,
        isVisible: false
    }),

    methods: {
        open() {
            this.isVisible = true
        },

        close() {
            this.isVisible = false
        },
        show(opts = {}) {
            this.title = opts.title
            this.message = opts.message
            this.okButton = opts.okButton
            if (opts.cancelButton) {
                this.cancelButton = opts.cancelButton
            }
            // Once we set our config, we tell the popup modal to open
            this.open()
            // Return promise so the caller can get results
            return new Promise((resolve, reject) => {
                this.resolvePromise = resolve
                this.rejectPromise = reject
            })
        },

        _confirm() {
            this.close()
            this.resolvePromise(true)
        },

        _cancel() {
            this.close()
            this.resolvePromise(false)
            // Or you can throw an error
            // this.rejectPromise(new Error('User cancelled the dialogue'))
        },
    },
}
</script>
<style scoped>
/* css class for the transition */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.popup-modal {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0.5rem;
    display: flex;
    align-items: center;
    z-index: 1;
}

.window {
    background: var(--vt-c-yellow-soft);;
    border-radius: 20px;
    box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
    padding: 1rem;
    color: #555;
}
.btns {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.ok-btn {
    color: red;
    text-decoration: underline;
    line-height: 2.5rem;
    cursor: pointer;
}

.cancel-btn {
    padding: 0.5em 1em;
    background-color: #d5eae7;
    color: #35907f;
    border: 2px solid #0ec5a4;
    border-radius: 5px;
    font-weight: bold;
    font-size: 16px;
    text-transform: uppercase;
    cursor: pointer;
}
</style>