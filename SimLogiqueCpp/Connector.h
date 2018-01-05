#ifndef CONNECTOR_H
#define CONNECTOR_H

#include <vector>

class Connection;
class Link;

class Connector {
    Connector(const Connector&) = delete;
    Connector& operator= (const Connector&) = delete;

public:
    Connector() {}
    virtual ~Connector();
    virtual void setConnection(Connection* connection);
    bool isConnected() const { return !(_links.empty()); }

protected:/* OU Connection* connection() { return _connection; } dans public */
    Connection* _connection = nullptr;

private:
    std::vector<Link*> _links;

    friend class Link;
    void connect(Link& link);
    void disconnect(Link& link);
};

#include "Connection.h"
#include "Link.h"

#endif // CONNECTOR_H
