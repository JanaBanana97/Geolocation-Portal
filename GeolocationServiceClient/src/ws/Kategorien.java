/**
 * Kategorien.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package ws;

public class Kategorien  implements java.io.Serializable {
    private java.lang.String bezeichnung;

    private int kategorienId;

    public Kategorien() {
    }

    public Kategorien(
           java.lang.String bezeichnung,
           int kategorienId) {
           this.bezeichnung = bezeichnung;
           this.kategorienId = kategorienId;
    }


    /**
     * Gets the bezeichnung value for this Kategorien.
     * 
     * @return bezeichnung
     */
    public java.lang.String getBezeichnung() {
        return bezeichnung;
    }


    /**
     * Sets the bezeichnung value for this Kategorien.
     * 
     * @param bezeichnung
     */
    public void setBezeichnung(java.lang.String bezeichnung) {
        this.bezeichnung = bezeichnung;
    }


    /**
     * Gets the kategorienId value for this Kategorien.
     * 
     * @return kategorienId
     */
    public int getKategorienId() {
        return kategorienId;
    }


    /**
     * Sets the kategorienId value for this Kategorien.
     * 
     * @param kategorienId
     */
    public void setKategorienId(int kategorienId) {
        this.kategorienId = kategorienId;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof Kategorien)) return false;
        Kategorien other = (Kategorien) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.bezeichnung==null && other.getBezeichnung()==null) || 
             (this.bezeichnung!=null &&
              this.bezeichnung.equals(other.getBezeichnung()))) &&
            this.kategorienId == other.getKategorienId();
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = 1;
        if (getBezeichnung() != null) {
            _hashCode += getBezeichnung().hashCode();
        }
        _hashCode += getKategorienId();
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(Kategorien.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://ws/", "kategorien"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("bezeichnung");
        elemField.setXmlName(new javax.xml.namespace.QName("", "bezeichnung"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "string"));
        elemField.setMinOccurs(0);
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("kategorienId");
        elemField.setXmlName(new javax.xml.namespace.QName("", "kategorienId"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.w3.org/2001/XMLSchema", "int"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
    }

    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

    /**
     * Get Custom Serializer
     */
    public static org.apache.axis.encoding.Serializer getSerializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanSerializer(
            _javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanDeserializer(
            _javaType, _xmlType, typeDesc);
    }

}
