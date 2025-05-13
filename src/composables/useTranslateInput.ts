import {computed, Ref, ref} from "vue";
import get from "lodash/get";
import set from "lodash/set";


export function useTranslateInput() {

    const isReference = ref(false);
    const prefix = `#/i18n/~$locale~/`

    function toCamelCase(text: string) {
        return text
            .toLowerCase()
            .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
    }

    function referenceChanged(modelValue: Ref<any>, path: string, inputValue: string) {
        if (isReference.value) {
            const newValue = {$ref: prefix + toCamelCase(inputValue)}
            set(modelValue.value, path, newValue)
        } else {
            const value = get(modelValue.value, path, {$ref: "changeMe"})
            const newValue = value.$ref.replace(prefix, '')
            set(modelValue.value, path, newValue)
        }
    }

    const getValueForInput = (path: string, modelValue: Ref<any>) => computed({
        get: () => {
            const value = get(modelValue.value, path, null);
            if (value == null) return null
            if (typeof value === 'string') {
                return value
            } else {
                isReference.value = true
                return value.$ref.replace(prefix, '');
            }
        },
        set: (value: string) => {
            if (value == null) {
                set(modelValue, path, "")
                return
            }
            const newValue = isReference.value ? {$ref: prefix + value.trim()} : value;
            set(modelValue.value, path, newValue)
        }
    });

    return {
        toCamelCase,
        prefix,
        isReference,
        referenceChanged,
        getValueForInput
    }
}
