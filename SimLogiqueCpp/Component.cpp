#include "Component.h"
#include "Exception.h"

Component::~Component() {
    while(!_pins.empty())
        deletePin(_pins.back());
}

void Component::move(int offX, int offY, int, int) {
    _x += offX;
    _y += offY;
}

void Component::draw(DrawingContext& context) const {
    foreach (Pin* pin, _pins) {
        pin->draw(context);
    }
}

Pin& Component::createPin(int x, int y, Orientation orientation, std::string name) {
    Pin* pin = new Pin(x,y,orientation, name);
    _pins.push_back(pin);
    return *pin;
}

void Component::deletePin(Pin* pin) {
    auto it = std::find(_pins.begin(), _pins.end(), pin);
    if(it == _pins.end())
        throw BasicException("No such pin to delete in this Component");
    delete pin;
    _pins.erase(it);
}
