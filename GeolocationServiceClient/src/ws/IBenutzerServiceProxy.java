package ws;

public class IBenutzerServiceProxy implements ws.IBenutzerService {
  private String _endpoint = null;
  private ws.IBenutzerService iBenutzerService = null;
  
  public IBenutzerServiceProxy() {
    _initIBenutzerServiceProxy();
  }
  
  public IBenutzerServiceProxy(String endpoint) {
    _endpoint = endpoint;
    _initIBenutzerServiceProxy();
  }
  
  private void _initIBenutzerServiceProxy() {
    try {
      iBenutzerService = (new ws.BenutzerServiceServiceLocator()).getBenutzerServicePort();
      if (iBenutzerService != null) {
        if (_endpoint != null)
          ((javax.xml.rpc.Stub)iBenutzerService)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
        else
          _endpoint = (String)((javax.xml.rpc.Stub)iBenutzerService)._getProperty("javax.xml.rpc.service.endpoint.address");
      }
      
    }
    catch (javax.xml.rpc.ServiceException serviceException) {}
  }
  
  public String getEndpoint() {
    return _endpoint;
  }
  
  public void setEndpoint(String endpoint) {
    _endpoint = endpoint;
    if (iBenutzerService != null)
      ((javax.xml.rpc.Stub)iBenutzerService)._setProperty("javax.xml.rpc.service.endpoint.address", _endpoint);
    
  }
  
  public ws.IBenutzerService getIBenutzerService() {
    if (iBenutzerService == null)
      _initIBenutzerServiceProxy();
    return iBenutzerService;
  }
  
  public ws.Benutzer[] getAllBenutzer() throws java.rmi.RemoteException{
    if (iBenutzerService == null)
      _initIBenutzerServiceProxy();
    return iBenutzerService.getAllBenutzer();
  }
  
  
}