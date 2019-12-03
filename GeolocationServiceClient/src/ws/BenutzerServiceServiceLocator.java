/**
 * BenutzerServiceServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package ws;

public class BenutzerServiceServiceLocator extends org.apache.axis.client.Service implements ws.BenutzerServiceService {

    public BenutzerServiceServiceLocator() {
    }


    public BenutzerServiceServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public BenutzerServiceServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for BenutzerServicePort
    private java.lang.String BenutzerServicePort_address = "http://localhost:4791/ws/BenutzerService";

    public java.lang.String getBenutzerServicePortAddress() {
        return BenutzerServicePort_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String BenutzerServicePortWSDDServiceName = "BenutzerServicePort";

    public java.lang.String getBenutzerServicePortWSDDServiceName() {
        return BenutzerServicePortWSDDServiceName;
    }

    public void setBenutzerServicePortWSDDServiceName(java.lang.String name) {
        BenutzerServicePortWSDDServiceName = name;
    }

    public ws.IBenutzerService getBenutzerServicePort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(BenutzerServicePort_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getBenutzerServicePort(endpoint);
    }

    public ws.IBenutzerService getBenutzerServicePort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            ws.BenutzerServicePortBindingStub _stub = new ws.BenutzerServicePortBindingStub(portAddress, this);
            _stub.setPortName(getBenutzerServicePortWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setBenutzerServicePortEndpointAddress(java.lang.String address) {
        BenutzerServicePort_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (ws.IBenutzerService.class.isAssignableFrom(serviceEndpointInterface)) {
                ws.BenutzerServicePortBindingStub _stub = new ws.BenutzerServicePortBindingStub(new java.net.URL(BenutzerServicePort_address), this);
                _stub.setPortName(getBenutzerServicePortWSDDServiceName());
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
        if ("BenutzerServicePort".equals(inputPortName)) {
            return getBenutzerServicePort();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://ws/", "BenutzerServiceService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://ws/", "BenutzerServicePort"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("BenutzerServicePort".equals(portName)) {
            setBenutzerServicePortEndpointAddress(address);
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
