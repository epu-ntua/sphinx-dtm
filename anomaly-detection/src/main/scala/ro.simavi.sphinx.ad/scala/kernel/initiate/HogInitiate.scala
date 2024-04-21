/*
* Copyright (C) 2015-2015 Paulo Angelo Alves Resende <pa@pauloangelo.com>
*
* This program is free software; you can redistribute it and/or modify
* it under the terms of the GNU General Public License Version 2 as
* published by the Free Software Foundation.  You may not use, modify or
* distribute this program under any other version of the GNU General
* Public License.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU General Public License for more details.
*
* You should have received a copy of the GNU General Public License
* along with this program; if not, write to the Free Software
* Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
*/

package ro.simavi.sphinx.ad.scala.kernel.initiate

import org.apache.hadoop.hbase.client.{Get, Put}
import org.apache.hadoop.hbase.util.Bytes
import org.apache.spark._
import ro.simavi.sphinx.ad.scala.kernel.hbase.HogHBaseRDD


object HogInitiate {
   
  val sensor_description="Hogzilla IDS"
  val sensor_hostname="hoghostname"
   
    
  def initiate(spark: SparkContext)
  {
   
    val get = new Get(Bytes.toBytes("1"))
    
    if(!HogHBaseRDD.getHogzillaSensor().exists(get))
    {
      val put = new Put(Bytes.toBytes("1"))
      put.addColumn(Bytes.toBytes("sensor"), Bytes.toBytes("description"), Bytes.toBytes(sensor_description))
      put.addColumn(Bytes.toBytes("sensor"), Bytes.toBytes("hostname"), Bytes.toBytes(sensor_hostname))
      HogHBaseRDD.getHogzillaSensor().put(put)
    }
    
  }
      
}