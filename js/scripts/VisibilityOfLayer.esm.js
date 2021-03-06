
const CLASS_TO_HIDE_LAYER = 'hidden';
export const HIDDEN_LAYER = false;
export const VISIBLE_LAYER = true;

class VisibilityOfLayer{
    changeVisibilityOfLayer(layer, isHidden){
        if(isHidden){
            layer.classList.remove(CLASS_TO_HIDE_LAYER);
        }else{
            layer.classList.add(CLASS_TO_HIDE_LAYER)
        }
    }
}

export const visibilityOfLayer = new VisibilityOfLayer();