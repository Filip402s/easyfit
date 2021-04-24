import React from "react";

interface Props {
    templates: Template[]
}

interface Template {
    id: string,
    name: string
}

const Templates: React.FC<Props> = ({templates}) => (
        <>
            {
                templates.map((template: Template) => <button>Start {template.name}</button>)
            }
        </>
    )
;

export default Templates;

