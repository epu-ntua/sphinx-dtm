// an inner array has this form: ['tool description', 'tool code', 'tool url']
export const SphinxTools: string[][] = [
  ['Category title', '', 'Preattack'],
  ['Heading background color', '', '#a6c742'],
  ['Odd row background color', '', '#ebf0d2'],
  ['Even row background color', '', '#d3e7c1'],
  ['Analytic Engine', 'AE', 'http://localhost/ae?ticket={ticket}'],
  ['Analytic Engine Description', 'AE description', ''],
  ['Anomaly Detection', 'AD', 'https://sphinx-kubernetes.intracom-telecom.com/id-ui/ad?ticket={ticket}'],
  ['Anomaly Detection Description', 'AD description', ''],
  ['Artificial Intelligence Honeypot', 'HP', 'http://localhost/hp?ticket={ticket}'],
  ['Artificial Intelligence Honeypot Description', 'HP description', ''],
  ['Blockchain Based Threats Registry', 'BBTR', 'http://localhost/bbtr?ticket={ticket}'],
  ['Blockchain Based Threats Registry Description', 'BBTR description', ''],
  ['Data Traffic Monitoring', 'DTM', 'https://sphinx-kubernetes.intracom-telecom.com/id-ui/dtm?ticket={ticket}'],
  ['Data Traffic Monitoring Description', 'DTM description', ''],
  ['Decision Support System', 'DSS', 'http://localhost/dss?ticket={ticket}'],
  ['Decision Support System Description', 'DSS description', ''],
  ['Knowledge Base', 'KB', 'http://localhost/kb?ticket={ticket}'],
  ['Knowledge Base Description', 'KB description', ''],
  ['Real-time Cyber Risk Assesment', 'RCRA', 'http://localhost/rcra?ticket={ticket}'],
  ['Real-time Cyber Risk Assesment Description', 'RCRA description', ''],
  ['Security Information and Event Management', 'SIEM', 'http://localhost/siem?ticket={ticket}'],
  ['Security Information and Event Management Description', 'SIEM description', ''],
  ['Vulnerability Assesment as a Service', 'VAaaS', 'http://localhost/vaaas?ticket={ticket}'],
  ['Vulnerability Assesment as a Service Description', 'VAaaS description', ''],
  ['Attack and Behaviour Simulators', 'ABS', 'http://localhost/abs?ticket={ticket}'],
  ['Attack and Behaviour Simulators Description', 'ABS description', ''],
  ['Machine Learning-empowered Intrusion Detection', 'MLID', 'http://localhost/mlid?ticket={ticket}'],
  ['Machine Learning-empowered Intrusion Detection Description', 'MLID description', ''],
  ['Homomorphic Encryption', 'HE', 'http://localhost/he?ticket={ticket}'],
  ['Homomorphic Encryption Description', 'HE description', ''],
  ['Anonymisation and Privacy', 'AP', 'http://localhost/ap?ticket={ticket}'],
  ['Anonymisation and Privacy Description', 'AP description', ''],
  ['Forensic Data Collection Engine', 'FDCE', 'http://localhost/fdce?ticket={ticket}'],
  ['Forensic Data Collection Engine Description', 'FDCE description', ''],
  ['Cyber Security Toolbox', 'CST', 'http://localhost/cst?ticket={ticket}'],
  ['Cyber Security Toolbox Description', 'CST description', ''],
  ['Application Programming Interface for Third Parties', 'S-API', 'http://localhost/sapi?ticket={ticket}'],
  ['Application Programming Interface for Third Parties Description', 'S-API description', ''],
  ['Sandbox', 'SB', 'http://localhost/sb?ticket={ticket}'],
  ['Sandbox Description', 'SB description', ''],
  ['Service Manager', 'SM', 'http://localhost/sm?ticket={ticket}'],
  ['Service Manager Description', 'SM description', ''],
  ['Common Integration Platform', 'CIP', 'http://localhost/cip?ticket={ticket}'],
  ['Common Integration Platform Description', 'CIP description', ''],
];

export interface SimpleOptions {
  sphinxToolsUrls: string[];
}
