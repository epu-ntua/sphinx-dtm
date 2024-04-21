// an inner array has this form: ['tool description', 'tool code', 'tool url']
export const SphinxTools: string[][] = [
  ['Analytic Engine', 'AE', 'http://localhost/ae?ticket={ticket}'],
  ['Anomaly Detection', 'AD', 'https://sphinx-kubernetes.intracom-telecom.com/id-ui/ad?ticket={ticket}'],
  ['Artificial Intelligence Honeypot', 'HP', 'http://localhost/hp?ticket={ticket}'],
  ['Blockchain Based Threats Registry', 'BBTR', 'http://localhost/bbtr?ticket={ticket}'],
  ['Data Traffic Monitoring', 'DTM', 'https://sphinx-kubernetes.intracom-telecom.com/id-ui/dtm?ticket={ticket}'],
  ['Decision Support System', 'DSS', 'http://localhost/dss?ticket={ticket}'],
  ['Knowledge Base', 'KB', 'http://localhost/kb?ticket={ticket}'],
  ['Real-time Cyber Risk Assesment', 'RCRA', 'http://localhost/rcra?ticket={ticket}'],
  ['Security Information and Event Management', 'SIEM', 'http://localhost/siem?ticket={ticket}'],
  ['Vulnerability Assesment as a Service', 'VAaaS', 'http://localhost/vaaas?ticket={ticket}'],
  ['Attack and Behaviour Simulators', 'ABS', 'http://localhost/abs?ticket={ticket}'],
  ['Machine Learning-empowered Intrusion Detection', 'MLID', 'http://localhost/mlid?ticket={ticket}'],
  ['Homomorphic Encryption', 'HE', 'http://localhost/he?ticket={ticket}'],
  ['Anonymisation and Privacy', 'AP', 'http://localhost/ap?ticket={ticket}'],
  ['Forensic Data Collection Engine', 'FDCE', 'http://localhost/fdce?ticket={ticket}'],
  ['Cyber Security Toolbox', 'CST', 'http://localhost/cst?ticket={ticket}'],
  ['Application Programming Interface for Third Parties', 'S-API', 'http://localhost/sapi?ticket={ticket}'],
  ['Sandbox', 'SB', 'http://localhost/sb?ticket={ticket}'],
  ['Service Manager', 'SM', 'http://localhost/sm?ticket={ticket}'],
  ['Common Integration Platform', 'CIP', 'http://localhost/cip?ticket={ticket}'],
  ['ID Endpoints URL', 'ID', 'http://localhost:8089'],
  ['Grafana backend APIs', 'GrafanaAPI', 'http://localhost:8089'],
];

export interface SimpleOptions {
  sphinxToolsUrls: string[];
}
