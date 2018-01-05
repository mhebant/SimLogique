#ifndef LINK_H
#define LINK_H

class Circuit;
class Connector;
class Connection;

class Link {
    Link (const Link&) = delete;
    Link& operator= (const Link&) = delete;

public:
    Link(Circuit& circuit, Connector& start, Connector& end);
    virtual ~Link();
    void setConnection(Connection* connection);

private:
    Circuit& _circuit;
    Connector& _start;
    Connector& _end;
    Connection* _connection = nullptr;
};

#include "Circuit.h"
#include "Connector.h"
#include "Connection.h"

#endif // LINK_H
