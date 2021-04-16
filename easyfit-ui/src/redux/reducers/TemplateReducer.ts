export const templateReducer = (state = {templates: []}, action: any) => {
    switch (action.type) {
        case "TEMPLATE_REQUEST":
            return {loading: true, templates: []}
        case "TEMPLATE_SUCCESS":
            return {loading: false, templates: action.payload}
        case "TEMPLATE_FAIL":
            return {loading: false, error: action.payload}
        default:
            return state
    }
}