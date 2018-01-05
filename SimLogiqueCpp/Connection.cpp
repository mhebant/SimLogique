#include "Connection.h"

// Connection
Connection::Connection(Circuit& circuit) : _circuit(circuit) {
    //_circuit._connections.insert(this);
}

Connection::~Connection() {
    //_circuit._connections.erase(_circuit.connections.find(this));

    // DEBUG
    //if(_pins.length) throw new Error("Connection destructor called and still connected ! (Should not append ^^)");
}

void Connection::addLink(Link& link) {
    _links.push_back(&link);
}

void Connection::removeLink(Link& link) {
    auto it = std::find(_links.begin(), _links.end(), &link);
    _links.erase(it);
    if(_links.empty())
        delete(this);
}

void Connection::update() {
   _value = false;
   for(auto it = _pins.begin(); it != _pins.end(); it++)
       if((*it)->_value) {
           _value = true;
           break;
       }
}





