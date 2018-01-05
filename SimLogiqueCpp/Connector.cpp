#include "Connector.h"

Connector::~Connector() {
    while(isConnected())
        delete(_links.back());
}

void Connector::setConnection(Connection* connection) {
    if(connection != _connection) {
        _connection = connection;
        for(auto it = _links.begin(); it != _links.end(); it++)
            (*it)->setConnection(connection);
    }
}

void Connector::connect(Link& link) {
    _links.push_back(&link);
    if(_connection != nullptr)
        link.setConnection(_connection);
}

void Connector::disconnect(Link& link) {
    auto it = std::find(_links.begin(), _links.end(), &link);
    _links.erase(it);
    if(!isConnected())
        setConnection(nullptr);
}
