#include "Pin.h"

void Pin::draw(DrawingContext& context) {
    QPainter& painter = context.painter();
    QPainterPath path;
    painter.save();
    painter.translate(x*context.gridStep(), y*context.gridStep());
    path.moveTo(0, 0);
    switch(orientation) {
    case Orientation::up:
        path.lineTo(0, -context.gridStep());
        break;
    case Orientation::left:
        path.lineTo(context.gridStep(), 0);
        break;
    case Orientation::down:
        path.lineTo(0, context.gridStep());
        break;
    case Orientation::right:
        path.lineTo(context.gridStep(), 0);
        break;
    }
    painter.drawPath(path);
    painter.restore();
}

void Pin::setConnection(Connection* connection) {
    if(_connection != connection) {
        if(_connection != nullptr) {
            auto it = std::find(_connection->_pins.begin(), _connection->_pins.end(), this);
            _connection->_pins.erase(it);
        }
        Connector::setConnection(connection);
        if(_connection != nullptr)
            _connection->_pins.push_back(this);
    }
}
