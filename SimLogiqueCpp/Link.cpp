#include "Link.h"

// Link
Link::Link(Circuit& circuit, Connector& start, Connector& end) : _circuit(circuit), _start(start), _end(end) {
    _start.connect(*this);
    _end.connect(*this);

    if(_connection == nullptr)
        setConnection(new Connection(_circuit));
}

Link::~Link() {
    _start.disconnect(*this);
    _end.disconnect(*this);
    if(_start.isConnected() && _end.isConnected())
        _start.setConnection(new Connection(_circuit));
    _connection->removeLink(*this);
}

void Link::setConnection(Connection* connection) {
    if(connection != _connection) {
        Connection* oldConnection = _connection;
        _connection = connection;
        _connection->addLink(*this);
        _start.setConnection(_connection);
        _end.setConnection(_connection);
        if(oldConnection != nullptr)
            oldConnection->removeLink(*this);
    }
}
