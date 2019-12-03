/**
 * LokationenServiceServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package ws;

public class LokationenServiceServiceLocator extends org.apache.axis.client.Service implements ws.LokationenServiceService {

    public LokationenServiceServiceLocator() {
    }


    public LokationenServiceServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public LokationenServiceServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for LokationenServicePort
    private java.lang.String LokationenServicePort_address = "http://localhost:4791/ws/LokationenService";

    public java.lang.String getLokationenServicePortAddress() {
        return LokationenServicePort_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String LokationenServicePortWSDDServiceName = "LokationenServicePort";

    public java.lang.String getLokationenServicePortWSDDServiceName() {
        return LokationenServicePortWSDDServiceName;
    }

    public void setLokationenServicePortWSDDServiceName(java.lang.String name) {
        LokationenServicePortWSDDServiceName = name;
    }

    public ws.ILokationenService getLokationenServicePort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(LokationenServicePort_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getLokationenServicePort(endpoint);
    }

    public ws.ILokationenService getLokationenServicePort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            ws.LokationenServicePortBindingStub _stub = new ws.LokationenServicePortBindingStub(portAddress, this);
            _stub.setPortName(getLokationenServicePortWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setLokationenServicePortEndpointAddress(java.lang.String address) {
        LokationenServicePort_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (ws.ILokationenService.class.isAssignableFrom(serviceEndpointInterface)) {
                ws.LokationenServicePortBindingStub _stub = new ws.LokationenServicePortBindingStub(new java.net.URL(LokationenServicePort_address), this);
                _stub.setPortName(getLokationenServicePortWSDDServiceName());
                return _stub;
            }
        }
        catch (java.lang.Throwable t) {
            throw new javax.xml.rpc.ServiceException(t);
        }
        throw new javax.xml.rpc.ServiceException("There is no stub implementation for the interface:  " + (serviceEndpointInterface == null ? "null" : serviceEndpointInterface.getName()));
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(javax.xml.namespace.QName portName, Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        if (portName == null) {
            return getPort(serviceEndpointInterface);
        }
        java.lang.String inputPortName = portName.getLocalPart();
        if ("LokationenServicePort".equals(inputPortName)) {
            return getLokationenServicePort();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://ws/", "LokationenServiceService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://ws/", "LokationenServicePort"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("LokationenServicePort".equals(portName)) {
            setLokationenServicePortEndpointAddress(address);
        }
        else 
{ // Unknown Port Name
            throw new javax.xml.rpc.ServiceException(" Cannot set Endpoint Address for Unknown Port" + portName);
        }
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(javax.xml.namespace.QName portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        setEndpointAddress(portName.getLocalPart(), address);
    }

}
