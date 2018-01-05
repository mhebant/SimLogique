#ifndef CONNECTION_H
#define CONNECTION_H

#include <vector>

class Circuit;
class Pin;
class Link;

class Connection {
    Connection(const Connection&) = delete;
    Connection& operator= (const Connection&) = delete;
private:
    friend class Link;
    Connection(Circuit& circuit);
    ~Connection();

public:
    Circuit& circuit() const { return _circuit; }
    bool value() const { return _value; }
    void update();

private:
    Circuit& _circuit;
    bool _value;

    friend class Pin;
    std::vector<Pin*> _pins;

    std::vector<Link*> _links;
    friend class Link;
    void addLink(Link& link);
    void removeLink(Link& link);
};

#include "Circuit.h"
#include "Pin.h"
#include "Link.h"

#endif // CONNECTION_H
