(function() {
    'use strict';

    /**
     * Class constructor for SSN Textfield MDL component.
     * Implements MDL component design pattern defined at:
     * https://github.com/jasonmayes/mdl-component-design-pattern
     *
     * @constructor
     * @param {HTMLElement} element The element that will be upgraded.
     */
    var MaterialSSNTextfield = function MaterialSSNTextfield(element) {
        this.element_ = element;
        this.rawValue = "";
        // Initialize instance.
        this.init();
    };
    window['MaterialSSNTextfield'] = MaterialSSNTextfield;

    /**
     * Store constants in one place so they can be updated easily.
     *
     * @enum {string | number}
     * @private
     */
    MaterialSSNTextfield.prototype.Constant_ = {
        Pattern: /^((\d{3})\u0020?-?\u0020?(\d{2})\u0020?-?\u0020?(\d{4}))?$/,
        MaskedPattern: /^\u2022\u2006\u2022\u2006\u2022\u0020-\u0020\u2022\u2006\u2022\u0020-\u0020(\d{4})$/
    };

    /**
     * Store strings for class names defined by this component that are used in
     * JavaScript. This allows us to simply change it in one place should we
     * decide to modify at a later date.
     *
     * @enum {string}
     * @private
     */
    MaterialSSNTextfield.prototype.CssClasses_ = {
        LABEL: 'mdl-ssn-textfield__label',
        INPUT: 'mdl-ssn-textfield__input',
        IS_DIRTY: 'is-dirty',
        IS_FOCUSED: 'is-focused',
        IS_DISABLED: 'is-disabled',
        IS_INVALID: 'is-invalid',
        IS_UPGRADED: 'is-upgraded',
        MASKED: 'mdl-ssn-textfield--masked'
    };

    /**
     * Handle focus.
     *
     * @param {Event} event The event that fired.
     * @private
     */
    MaterialSSNTextfield.prototype.onFocus_ = function (event) {
        if (this.element_.classList.contains(this.CssClasses_.MASKED) && this.Constant_.MaskedPattern.test(this.input_.value)) {
            //Unmask the field while focused
            var matches = this.Constant_.Pattern.exec(this.rawValue);
            this.input_.value = matches[2] + " - " + matches[3] + " - " + matches[4];
        }
        this.element_.classList.add(this.CssClasses_.IS_FOCUSED);       
    };

    /**
     * Handle lost focus.
     *
     * @param {Event} event The event that fired.
     * @private
     */
    MaterialSSNTextfield.prototype.onBlur_ = function (event) {
        this.updateClasses_();
        if (this.element_.classList.contains(this.CssClasses_.IS_DIRTY) && !this.element_.classList.contains(this.CssClasses_.IS_INVALID) && !this.Constant_.MaskedPattern.test(this.input_.value)) {
            var matches = this.Constant_.Pattern.exec(this.input_.value);
            this.rawValue = matches[2] + matches[3] + matches[4];
            //Determine which visual format to use
            if (this.element_.classList.contains(this.CssClasses_.MASKED)) {
                this.input_.value = "\u2022\u2006\u2022\u2006\u2022 - " + "\u2022\u2006\u2022 - " + matches[4];
            } else {
                this.input_.value = matches[2] + " - " + matches[3] + " - " + matches[4];
            }
        }
        this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
    };

    /**
     * Handle reset event from out side.
     *
     * @param {Event} event The event that fired.
     * @private
     */
    MaterialSSNTextfield.prototype.onReset_ = function (event) {
        this.updateClasses_();
    };

    /**
     * Handle class updates.
     *
     * @private
     */
    MaterialSSNTextfield.prototype.updateClasses_ = function () {
        this.checkDisabled();
        this.checkValidity();
        this.checkDirty();
        this.checkFocus();
    };

    // Public methods.

    /**
     * Check the disabled state and update field accordingly.
     *
     * @public
     */
    MaterialSSNTextfield.prototype.checkDisabled = function () {
        if (this.input_.disabled) {
            this.element_.classList.add(this.CssClasses_.IS_DISABLED);
        } else {
            this.element_.classList.remove(this.CssClasses_.IS_DISABLED);
        }
    };
    MaterialSSNTextfield.prototype['checkDisabled'] =
        MaterialSSNTextfield.prototype.checkDisabled;

    /**
     * Retrieve the raw value of the field
     * @returns {string} unmasked value
     */
    MaterialSSNTextfield.prototype.getValue = function () {
        return this.rawValue;
    };
    MaterialSSNTextfield.prototype['getValue'] =
        MaterialSSNTextfield.prototype.getValue;

    /**
    * Check the focus state and update field accordingly.
    *
    * @public
    */
    MaterialSSNTextfield.prototype.checkFocus = function () {
        if (Boolean(this.element_.querySelector(':focus'))) {
            this.element_.classList.add(this.CssClasses_.IS_FOCUSED);
        } else {
            this.element_.classList.remove(this.CssClasses_.IS_FOCUSED);
        }
    };
    MaterialSSNTextfield.prototype['checkFocus'] =
      MaterialSSNTextfield.prototype.checkFocus;

    /**
     * Check the validity state and update field accordingly.
     *
     * @public
     */
    MaterialSSNTextfield.prototype.checkValidity = function () {
        if (this.input_.validity) {
            if (this.input_.validity.valid && (this.Constant_.Pattern.test(this.input_.value) || this.Constant_.MaskedPattern.test(this.input_.value))) {
                this.element_.classList.remove(this.CssClasses_.IS_INVALID);
            } else {
                this.element_.classList.add(this.CssClasses_.IS_INVALID);
            }
        }
    };
    MaterialSSNTextfield.prototype['checkValidity'] =
        MaterialSSNTextfield.prototype.checkValidity;

    /**
     * Check the dirty state and update field accordingly.
     *
     * @public
     */
    MaterialSSNTextfield.prototype.checkDirty = function () {
        if (this.input_.value && this.input_.value.length > 0) {
            this.element_.classList.add(this.CssClasses_.IS_DIRTY);
        } else {
            this.element_.classList.remove(this.CssClasses_.IS_DIRTY);
        }
    };
    MaterialSSNTextfield.prototype['checkDirty'] =
        MaterialSSNTextfield.prototype.checkDirty;

    /**
     * Disable text field.
     *
     * @public
     */
    MaterialSSNTextfield.prototype.disable = function () {
        this.input_.disabled = true;
        this.updateClasses_();
    };
    MaterialSSNTextfield.prototype['disable'] = MaterialSSNTextfield.prototype.disable;

    /**
     * Enable text field.
     *
     * @public
     */
    MaterialSSNTextfield.prototype.enable = function () {
        this.input_.disabled = false;
        this.updateClasses_();
    };
    MaterialSSNTextfield.prototype['enable'] = MaterialSSNTextfield.prototype.enable;

    /**
     * Update text field value.
     *
     * @param {string} value The value to which to set the control (optional).
     * @public
     */
    MaterialSSNTextfield.prototype.change = function (value) {

        this.input_.value = value || '';
        this.updateClasses_();
    };
    MaterialSSNTextfield.prototype['change'] = MaterialSSNTextfield.prototype.change;

    /**
   * Initialize element.
   */
    MaterialSSNTextfield.prototype.init = function () {

        if (this.element_) {
            this.label_ = this.element_.querySelector('.' + this.CssClasses_.LABEL);
            this.input_ = this.element_.querySelector('.' + this.CssClasses_.INPUT);

            if (this.input_) {
                this.boundUpdateClassesHandler = this.updateClasses_.bind(this);
                this.boundFocusHandler = this.onFocus_.bind(this);
                this.boundBlurHandler = this.onBlur_.bind(this);
                this.boundResetHandler = this.onReset_.bind(this);
                this.input_.addEventListener('input', this.boundUpdateClassesHandler);
                this.input_.addEventListener('focus', this.boundFocusHandler);
                this.input_.addEventListener('blur', this.boundBlurHandler);
                this.input_.addEventListener('reset', this.boundResetHandler);

                var invalid = this.element_.classList.contains(this.CssClasses_.IS_INVALID);
                this.updateClasses_();
                this.element_.classList.add(this.CssClasses_.IS_UPGRADED);
                if (invalid) {
                    this.element_.classList.add(this.CssClasses_.IS_INVALID);
                }
                if (this.input_.hasAttribute('autofocus')) {
                    this.element_.focus();
                    this.checkFocus();
                }
                if (this.element_.className.indexOf(this.CssClasses_.IS_DIRTY) !== -1) {
                    this.onBlur_();
                }
            }
        }
    };

    // The component registers itself. It can assume componentHandler is available
    // in the global scope.
    componentHandler.register({
        constructor: MaterialSSNTextfield,
        classAsString: 'MaterialSSNTextfield',
        cssClass: 'mdl-js-ssn-textfield',
        widget: true
    });
})();