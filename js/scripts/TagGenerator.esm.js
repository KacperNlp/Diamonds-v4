class TagGenerator{
    createTag(tag){
        return document.createElement(tag);
    }
}

export const LIST_OF_TAGS = {
    button: 'button',
    div: 'div',
    span: 'span'
}

export const tagGenerator = new TagGenerator();