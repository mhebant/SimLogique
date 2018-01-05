#include "Pin.h"

void Pin::draw(DrawingContext& context) {

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
