import { IText } from "./Banner.type"

export default function Validation(group: string, name: string, link: string, order: number, text: IText[], image: string) { 
    const errors = {}

    if (group === "") { 
        errors.group = "Group Is Required!"
    }

    if (name === "") { 
        errors.name = "Name Is Required!"
    }

    if (link === "") { 
        errors.link = "Link Is Required!"
    }

    if (order === 0) { 
        errors.order = "Order Is Required!"
    }

    if (text[0].value === "") { 
        errors.text = "Text Is Required!"
    }

    if (image === "") { 
        errors.image = "Image Is Required!"
    }

    return errors;
}