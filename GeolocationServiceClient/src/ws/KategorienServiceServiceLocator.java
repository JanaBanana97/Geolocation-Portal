/**
 * KategorienServiceServiceLocator.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package ws;

public class KategorienServiceServiceLocator extends org.apache.axis.client.Service implements ws.KategorienServiceService {

    public KategorienServiceServiceLocator() {
    }


    public KategorienServiceServiceLocator(org.apache.axis.EngineConfiguration config) {
        super(config);
    }

    public KategorienServiceServiceLocator(java.lang.String wsdlLoc, javax.xml.namespace.QName sName) throws javax.xml.rpc.ServiceException {
        super(wsdlLoc, sName);
    }

    // Use to get a proxy class for KategorienServicePort
    private java.lang.String KategorienServicePort_address = "http://localhost:4791/ws/KategorienService";

    public java.lang.String getKategorienServicePortAddress() {
        return KategorienServicePort_address;
    }

    // The WSDD service name defaults to the port name.
    private java.lang.String KategorienServicePortWSDDServiceName = "KategorienServicePort";

    public java.lang.String getKategorienServicePortWSDDServiceName() {
        return KategorienServicePortWSDDServiceName;
    }

    public void setKategorienServicePortWSDDServiceName(java.lang.String name) {
        KategorienServicePortWSDDServiceName = name;
    }

    public ws.IKategorienService getKategorienServicePort() throws javax.xml.rpc.ServiceException {
       java.net.URL endpoint;
        try {
            endpoint = new java.net.URL(KategorienServicePort_address);
        }
        catch (java.net.MalformedURLException e) {
            throw new javax.xml.rpc.ServiceException(e);
        }
        return getKategorienServicePort(endpoint);
    }

    public ws.IKategorienService getKategorienServicePort(java.net.URL portAddress) throws javax.xml.rpc.ServiceException {
        try {
            ws.KategorienServicePortBindingStub _stub = new ws.KategorienServicePortBindingStub(portAddress, this);
            _stub.setPortName(getKategorienServicePortWSDDServiceName());
            return _stub;
        }
        catch (org.apache.axis.AxisFault e) {
            return null;
        }
    }

    public void setKategorienServicePortEndpointAddress(java.lang.String address) {
        KategorienServicePort_address = address;
    }

    /**
     * For the given interface, get the stub implementation.
     * If this service has no port for the given interface,
     * then ServiceException is thrown.
     */
    public java.rmi.Remote getPort(Class serviceEndpointInterface) throws javax.xml.rpc.ServiceException {
        try {
            if (ws.IKategorienService.class.isAssignableFrom(serviceEndpointInterface)) {
                ws.KategorienServicePortBindingStub _stub = new ws.KategorienServicePortBindingStub(new java.net.URL(KategorienServicePort_address), this);
                _stub.setPortName(getKategorienServicePortWSDDServiceName());
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
        if ("KategorienServicePort".equals(inputPortName)) {
            return getKategorienServicePort();
        }
        else  {
            java.rmi.Remote _stub = getPort(serviceEndpointInterface);
            ((org.apache.axis.client.Stub) _stub).setPortName(portName);
            return _stub;
        }
    }

    public javax.xml.namespace.QName getServiceName() {
        return new javax.xml.namespace.QName("http://ws/", "KategorienServiceService");
    }

    private java.util.HashSet ports = null;

    public java.util.Iterator getPorts() {
        if (ports == null) {
            ports = new java.util.HashSet();
            ports.add(new javax.xml.namespace.QName("http://ws/", "KategorienServicePort"));
        }
        return ports.iterator();
    }

    /**
    * Set the endpoint address for the specified port name.
    */
    public void setEndpointAddress(java.lang.String portName, java.lang.String address) throws javax.xml.rpc.ServiceException {
        
if ("KategorienServicePort".equals(portName)) {
            setKategorienServicePortEndpointAddress(address);
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
