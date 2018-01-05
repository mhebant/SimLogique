#ifndef PIN_H
#define PIN_H

#include <string>

#include "Connector.h"
#include "DrawingContext.h"

enum class Orientation { up = 0, left = 1, down = 2, right = 3 };
inline Orientation& operator++(Orientation& o) {
    if(o == Orientation::right)
        o = Orientation::up;
    else
        o = static_cast<Orientation>(static_cast<int>(o)+1);
    return o;
}
inline Orientation operator++(Orientation& o, int) {
    Orientation tmp = o;
    ++o;
    return tmp;
}
inline Orientation& operator--(Orientation& o) {
    if(o == Orientation::up)
        o = Orientation::right;
    else
        o = static_cast<Orientation>(static_cast<int>(o)-1);
    return o;
}
inline Orientation operator--(Orientation& o, int) {
    Orientation tmp = o;
    --o;
    return tmp;
}

class Pin : public Connector {
public:
    Pin(int x, int y, Orientation orientation, const std::string& name) : _x(x), _y(y), _orientation(orientation), _name(name) {}
    bool value() { return _value || (_connection && _connection->value()); }
    void value(bool value) { _value = value; }
    void draw(DrawingContext& context);
    virtual void setConnection(Connection* connection) override;

private:
    friend class Connection;
    bool _value = false;

    int _x;
    int _y;
    Orientation _orientation;
    std::string _name;
};

#endif // PIN_H
