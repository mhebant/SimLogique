#ifndef EXCEPTION_H
#define EXCEPTION_H

#include <exception>
#include <string>

class SLException : public std::exception {

};

class BasicException : public SLException {
    std::string msg;
public:
    BasicException(const std::string& msg) : msg(msg) {}
    virtual const char* what() const noexcept override { return msg.c_str(); }
};

#endif // EXCEPTION_H
