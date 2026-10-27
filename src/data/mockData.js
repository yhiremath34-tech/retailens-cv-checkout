// Mock SKUs for the interactive checkout counter (Indian Retail Market INR Pricing)
export const CATALOG_ITEMS = [
  {
    id: 'sku-01',
    name: 'Nitro Cold Brew Coffee',
    category: 'Beverages',
    price: 149.00,
    sku: 'BEV-4421',
    confidence: 0.987,
    color: '#06B6D4', // cyan
    dimensions: { w: 90, h: 120 },
    icon: 'coffee',
    description: '12 fl oz single-origin cold brew can',
    weight: '340g',
    cvFeatures: ['Cylindrical contour', 'Matte black gradient', 'High contrast label'],
    initialPosition: { x: 95, y: 85 }
  },
  {
    id: 'sku-02',
    name: 'Artisan Sourdough Bread',
    category: 'Bakery',
    price: 199.00,
    sku: 'BRD-1029',
    confidence: 0.978,
    color: '#F59E0B', // amber
    dimensions: { w: 140, h: 90 },
    icon: 'bread',
    description: 'Rustic naturally leavened sourdough loaf',
    weight: '680g',
    cvFeatures: ['Textured crust pattern', 'Elliptical blob', 'Flour dust variance'],
    initialPosition: { x: 250, y: 70 }
  },
  {
    id: 'sku-03',
    name: 'Organic Whole Milk',
    category: 'Dairy',
    price: 75.00,
    sku: 'MLK-0842',
    confidence: 0.992,
    color: '#10B981', // emerald
    dimensions: { w: 95, h: 135 },
    icon: 'milk',
    description: '1 Litre pasture-raised organic cow milk',
    weight: '1.0kg',
    cvFeatures: ['Rectangular prism', 'High-key white mask', 'Green cap color peak'],
    initialPosition: { x: 120, y: 235 }
  },
  {
    id: 'sku-04',
    name: 'Honey Almond Granola Cereal',
    category: 'Pantry',
    price: 249.00,
    sku: 'CER-8831',
    confidence: 0.994,
    color: '#8B5CF6', // purple
    dimensions: { w: 120, h: 140 },
    icon: 'cereal',
    description: '400g whole grain oats & roasted almonds',
    weight: '400g',
    cvFeatures: ['Box aspect ratio 1:1.4', 'Yellow saturation cluster', 'Corner Harris response'],
    initialPosition: { x: 270, y: 200 }
  },
  {
    id: 'sku-05',
    name: 'Organic Hass Avocado',
    category: 'Produce',
    price: 89.00,
    sku: 'PRD-3301',
    confidence: 0.965,
    color: '#84CC16', // lime
    dimensions: { w: 80, h: 80 },
    icon: 'avocado',
    description: 'Fresh Hass avocado (Single item)',
    weight: '170g',
    cvFeatures: ['Pebbled skin texture', 'Dark emerald HSV threshold', 'Convex hull index 0.94'],
    initialPosition: { x: 190, y: 155 }
  },
  {
    id: 'sku-06',
    name: 'Organic Greek Yogurt',
    category: 'Dairy',
    price: 65.00,
    sku: 'YOG-7740',
    confidence: 0.982,
    color: '#38BDF8', // sky blue
    dimensions: { w: 85, h: 85 },
    icon: 'yogurt',
    description: '150g natural high-protein strained yogurt',
    weight: '150g',
    cvFeatures: ['Circular top profile', 'White plastic reflection', 'Foil seal centroid'],
    initialPosition: { x: 380, y: 120 }
  }
];

// 4-Stage Architecture data
export const ARCHITECTURE_STAGES = [
  {
    id: 'stage-1',
    stepNumber: '01',
    title: 'Edge Computer Vision Pipeline',
    subtitle: 'Python 3.11 • OpenCV 4.10 • Lightweight SSD',
    badge: 'Edge Node (< 18ms)',
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10',
    summary: 'High-speed top-down frame acquisition, CLAHE adaptive equalization, background subtraction, and persistent centroid tracking running locally on edge compute.',
    keyPoints: [
      'Raw 1080p @ 60 FPS RTSP ingestion with zero cloud upload overhead',
      'OpenCV CLAHE (clipLimit=2.0, tileGridSize=8x8) eliminates harsh neon glare',
      'Kalman filter + Hungarian centroid association maintains tracking across occlusions',
      'Filters out redundant frames, pushing only delta state changes'
    ],
    codeSnippet: `# Edge Inference Loop (edge_cv_tracker.py)
import cv2
import numpy as np

clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
tracker = CentroidTracker(maxDisappeared=25, maxDistance=45)

def process_frame(frame):
    # Equalize illumination to defeat specular store glare
    lab = cv2.cvtColor(frame, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    l_eq = clahe.apply(l)
    norm_frame = cv2.cvtColor(cv2.merge((l_eq, a, b)), cv2.COLOR_LAB2BGR)
    
    # Fast lightweight bounding box proposal & centroid update
    detections = detector.detect(norm_frame, conf_threshold=0.85)
    tracked_objects = tracker.update(detections)
    
    return tracked_objects`,
    telemetryMetrics: {
      latency: '17.8 ms',
      throughput: '58.6 FPS',
      compute: 'RPI 5 / Jetson Orin Nano',
      payloadSize: '1.2 KB JSON'
    }
  },
  {
    id: 'stage-2',
    stepNumber: '02',
    title: 'Real-Time Telemetry Ingestion',
    subtitle: 'AWS IoT Core • Amazon Kinesis Data Streams',
    badge: 'Pub/Sub Ingestion (QoS 1)',
    badgeColor: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
    summary: 'Instead of streaming gigabytes of raw video, the edge node publishes microsecond MQTT JSON messages to AWS IoT Core, buffered by Amazon Kinesis for high-velocity streaming.',
    keyPoints: [
      'TLS 1.3 mutual certificate authentication between Edge hardware and AWS IoT Core',
      'MQTT topic routing: store/{store_id}/lane/{lane_id}/checkout_events',
      'Bandwidth reduced by 94.2% compared to cloud streaming',
      'Amazon Kinesis Shard buffering handles peak checkout surges up to 10k events/sec'
    ],
    codeSnippet: `# AWS IoT Core MQTT Publisher (edge_iot_client.py)
from awscrt import mqtt
from awsiot import mqtt_connection_builder
import json, time

client = mqtt_connection_builder.mtls_from_path(
    endpoint="a3q9k34z0-ats.iot.us-east-1.amazonaws.com",
    cert_filepath="/etc/certs/device.pem.crt",
    pri_key_filepath="/etc/certs/private.pem.key",
    client_id="store-austin-04-lane-02"
)

def emit_telemetry(payload):
    client.publish(
        topic="store/04/lane/02/cart/events",
        payload=json.dumps(payload),
        qos=mqtt.QoS.AT_LEAST_ONCE
    )`,
    telemetryMetrics: {
      latency: '42 ms',
      throughput: '10,000 evt/s',
      transport: 'MQTT over TLS 1.3',
      dataReduction: '94.2%'
    }
  },
  {
    id: 'stage-3',
    stepNumber: '03',
    title: 'Serverless Transaction Engine',
    subtitle: 'AWS Lambda • Amazon DynamoDB • EventBridge',
    badge: 'Sub-Second State (< 80ms)',
    badgeColor: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
    summary: 'Stateless AWS Lambda functions triggered by Kinesis batches validate cart states, check hand-to-item interaction history, and maintain atomic cart totals in Amazon DynamoDB.',
    keyPoints: [
      'DynamoDB single-table design with sub-5ms read/write latency',
      'Cart TTL ensures abandoned sessions auto-expire after 5 minutes of inactivity',
      'Loss Prevention heuristic: flags unverified item pickups or hand occlusions',
      'EventBridge fans out finalized transactions to billing, loyalty, and inventory services'
    ],
    codeSnippet: `# Cart Processor Lambda (lambda_function.py)
import boto3, json, time
dynamodb = boto3.resource('dynamodb')
cart_table = dynamodb.Table('RetailCartState')

def lambda_handler(event, context):
    for record in event['Records']:
        payload = json.loads(record['kinesis']['data'])
        cart_id = payload['cart_id']
        
        # Atomic add/remove SKU with item price lookup
        response = cart_table.update_item(
            Key={'cart_id': cart_id},
            UpdateExpression="SET items = list_append(if_not_exists(items, :empty), :item), updated_at = :ts",
            ExpressionAttributeValues={
                ':empty': [],
                ':item': [payload['detected_item']],
                ':ts': int(time.time())
            },
            ReturnValues="ALL_NEW"
        )
    return {"statusCode": 200}`,
    telemetryMetrics: {
      latency: '65 ms',
      costPerTx: '₹0.02',
      storage: 'DynamoDB On-Demand',
      slaAvailability: '99.99%'
    }
  },
  {
    id: 'stage-4',
    stepNumber: '04',
    title: 'Enterprise BI & Store Intelligence',
    subtitle: 'Amazon S3 Data Lake • Amazon QuickSight',
    badge: 'Store Analytics (Real-Time)',
    badgeColor: 'border-purple-500/30 text-purple-400 bg-purple-500/10',
    summary: 'Streaming data flows via Kinesis Firehose into Amazon S3 Parquet partitions, powering Amazon QuickSight dashboards for store occupancy, dwell heatmaps, and shrinkage metrics.',
    keyPoints: [
      'Automated columnar Parquet conversion & Snappy compression via Kinesis Firehose',
      'Amazon QuickSight SPICE engine powers sub-second interactive executive dashboards',
      'Heatmap spatial aggregation calculates shelf dwell times and conversion funnels',
      'Automated shrinkage audit trails with synchronized video timestamp markers'
    ],
    codeSnippet: `# QuickSight Data Query (Athena / S3 Parquet)
SELECT 
    zone_id,
    COUNT(DISTINCT session_id) AS total_shoppers,
    AVG(dwell_seconds) AS avg_dwell_time,
    SUM(CASE WHEN shrinkage_flag = 1 THEN 1 ELSE 0 END) AS alert_count,
    ROUND(SUM(cart_total_inr), 2) AS gross_merchandise_value
FROM "retail_data_lake"."checkout_telemetry"
WHERE dt = CURRENT_DATE
GROUP BY zone_id
ORDER BY gross_merchandise_value DESC;`,
    telemetryMetrics: {
      storageCost: '₹1.90/GB-mo',
      queryEngine: 'Athena + QuickSight',
      freshness: '< 60 sec',
      dashboards: 'Executive & Store Mgr'
    }
  }
];

// Engineering Deep-Dive Challenges & Solutions
export const ENGINEERING_CHALLENGES = [
  {
    id: 'challenge-1',
    title: 'Occlusion & Fast Hand Motion',
    category: 'Computer Vision Tracking',
    icon: 'eye-off',
    tag: 'Centroid Memory Buffer',
    problem: 'When shoppers place hands or personal bags over items during bagging, standard object detectors lose the bounding box, resulting in false cart-removal and rapid re-detection flickering.',
    solution: 'Engineered a persistent centroid tracker utilizing Euclidean distance bipartite matching and an exponential decay disappearance buffer. The tracker retains item identity for up to 25 dropped frames before deregistering.',
    benchmark: {
      before: '42.3% ID switch rate during bagging',
      after: '< 1.4% ID switch rate with zero cart flicker'
    },
    codeHighlight: 'tracker.register(centroid) | tracker.disappeared[objectID] <= 25'
  },
  {
    id: 'challenge-2',
    title: 'Edge vs. Cloud Latency & Bandwidth',
    category: 'Distributed System Architecture',
    icon: 'wifi-off',
    tag: 'Edge Filtering (94% Savings)',
    problem: 'Streaming 1080p 60fps raw video streams from 16 store cameras to AWS for cloud computer vision requires over 380 Mbps upstream bandwidth and incurs ₹98,000+/month in egress costs per store.',
    solution: 'Offloaded full image ingestion, background subtraction, and object bounding box proposal to local edge compute (e.g. Raspberry Pi 5 / Jetson). Only 1.2 KB JSON telemetry packets are emitted to AWS IoT Core over MQTT QoS 1.',
    benchmark: {
      before: '24.8 GB/hour raw video bandwidth',
      after: '1.4 MB/hour lightweight JSON metadata'
    },
    codeHighlight: 'Bandwidth saved: 94.2% | Latency dropped from 650ms to 18ms'
  },
  {
    id: 'challenge-3',
    title: 'Harsh Retail Lighting & Specular Glare',
    category: 'Digital Image Processing',
    icon: 'sun',
    tag: 'OpenCV CLAHE Pipeline',
    problem: 'Overhead high-intensity LED and fluorescent grocery store lights produce harsh specular reflections on glossy plastic packaging (e.g., milk cartons, cold brew cans), blinding feature extraction.',
    solution: 'Built an adaptive pre-processing pipeline in OpenCV: converting frames to LAB color space and applying Contrast Limited Adaptive Histogram Equalization (CLAHE) with clipLimit=2.0 on the luminance channel, coupled with Otsu adaptive thresholding.',
    benchmark: {
      before: '79.2% classification accuracy under glare',
      after: '99.1% classification accuracy restored'
    },
    codeHighlight: 'cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8)).apply(L_channel)'
  }
];

// QuickSight Store Heatmap Zones
export const STORE_ZONES = [
  {
    id: 'zone-bev',
    name: 'Grab & Go Cold Beverages',
    occupancy: 8,
    avgDwell: '42s',
    heatIndex: 88,
    popularItem: 'Nitro Cold Brew Coffee',
    status: 'High Traffic',
    coordinates: { x: '6%', y: '15%', w: '28%', h: '39%' },
    color: '#06B6D4',
    image: '/images/zones/cold-beverages.jpg'
  },
  {
    id: 'zone-bakery',
    name: 'Artisan Bakery & Fresh Bread',
    occupancy: 5,
    avgDwell: '64s',
    heatIndex: 65,
    popularItem: 'Sourdough Loaf',
    status: 'Moderate',
    coordinates: { x: '37%', y: '15%', w: '27%', h: '39%' },
    color: '#F59E0B',
    image: '/images/zones/artisan-bakery.jpg'
  },
  {
    id: 'zone-dairy',
    name: 'Dairy & Plant-Based Milk',
    occupancy: 11,
    avgDwell: '51s',
    heatIndex: 82,
    popularItem: 'Organic Whole Milk',
    status: 'Peak Demand',
    coordinates: { x: '67%', y: '15%', w: '27%', h: '39%' },
    color: '#10B981',
    image: '/images/zones/dairy-milk.jpg'
  },
  {
    id: 'zone-produce',
    name: 'Organic Fresh Produce',
    occupancy: 9,
    avgDwell: '78s',
    heatIndex: 71,
    popularItem: 'Hass Avocado',
    status: 'High Engagement',
    coordinates: { x: '6%', y: '57%', w: '44%', h: '39%' },
    color: '#84CC16',
    image: '/images/zones/fresh-produce.jpg'
  },
  {
    id: 'zone-checkout',
    name: 'Autonomous CV Checkout Counters (x4)',
    occupancy: 4,
    avgDwell: '11s',
    heatIndex: 94,
    popularItem: 'Avg Transaction: ₹423',
    status: 'Optimal Flow (< 12s)',
    coordinates: { x: '54%', y: '57%', w: '40%', h: '39%' },
    color: '#8B5CF6',
    image: '/images/zones/cv-checkout.jpg'
  }
];

// Sample AWS IoT Core JSON Telemetry Payloads
export const SAMPLE_MQTT_EVENTS = [
  {
    eventId: 'evt_99182a',
    timestamp: '2026-10-26T16:32:01.418Z',
    topic: 'store/04/lane/01/telemetry',
    eventType: 'ITEM_TRACKED',
    payload: {
      event_type: 'ITEM_TRACKED',
      device_id: 'edge-cam-lane01-overhead',
      store_id: 'bengaluru-hub-04',
      fps: 58.7,
      edge_latency_ms: 17.6,
      item: {
        sku: 'BEV-4421',
        name: 'Nitro Cold Brew Coffee',
        tracking_id: 1,
        centroid: [184, 142],
        bbox: [120, 95, 240, 185],
        confidence: 0.987,
        clahe_applied: true
      },
      loss_prevention_status: 'NORMAL'
    }
  },
  {
    eventId: 'evt_99182b',
    timestamp: '2026-10-26T16:32:02.102Z',
    topic: 'store/04/lane/01/telemetry',
    eventType: 'ITEM_TRACKED',
    payload: {
      event_type: 'ITEM_TRACKED',
      device_id: 'edge-cam-lane01-overhead',
      store_id: 'bengaluru-hub-04',
      fps: 59.1,
      edge_latency_ms: 18.2,
      item: {
        sku: 'BRD-1029',
        name: 'Artisan Sourdough Bread',
        tracking_id: 2,
        centroid: [315, 128],
        bbox: [240, 80, 380, 170],
        confidence: 0.978,
        clahe_applied: true
      },
      loss_prevention_status: 'NORMAL'
    }
  },
  {
    eventId: 'evt_99183c',
    timestamp: '2026-10-26T16:32:03.882Z',
    topic: 'store/04/lane/01/alerts',
    eventType: 'OCCLUSION_SHRINKAGE_ALERT',
    payload: {
      event_type: 'OCCLUSION_SHRINKAGE_ALERT',
      severity: 'WARNING_AMBER',
      device_id: 'edge-cam-lane01-overhead',
      alert_code: 'UNVERIFIED_HAND_INTERACTION',
      occlusion_score: 0.884,
      affected_item: {
        sku: 'MLK-0842',
        tracking_id: 3,
        last_centroid: [168, 280]
      },
      action_taken: 'PAUSE_CHECKOUT_CONFIRMATION',
      operator_audit_clip: 's3://retail-cv-audit/lane01/evt_99183c.mp4'
    }
  },
  {
    eventId: 'evt_99184d',
    timestamp: '2026-10-26T16:32:05.200Z',
    topic: 'store/04/lane/01/checkout',
    eventType: 'CART_FINALIZED',
    payload: {
      event_type: 'CART_FINALIZED',
      cart_id: 'cart-session-88392',
      lane_id: 'lane-01',
      shopper_dwell_ms: 8420,
      item_count: 3,
      gross_total_inr: 423.00,
      verified_by_cv: true,
      shrinkage_risk_score: 0.02,
      dynamodb_write_ms: 4.8
    }
  }
];

// Roadmap milestones
export const ROADMAP_STEPS = [
  {
    phase: 'Phase 01',
    status: 'In Production',
    statusColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    title: 'Edge AI Silicon Acceleration',
    description: 'Porting and INT8 quantizing custom OpenCV/YOLO models to Luxonis OAK-D spatial cameras and AWS Panorama appliances for sub-10ms inference and 120+ FPS counter coverage.',
    tags: ['Luxonis OAK-D', 'AWS Panorama', 'OpenVINO', 'INT8 Quantization']
  },
  {
    phase: 'Phase 02',
    status: 'Active Pilot',
    statusColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    title: 'Omnichannel Walk-Out Seamless Payments',
    description: 'Pairing edge counter tracking with tokenized BLE/UWB mobile beacons or one-scan QR loyalty passes to enable true friction-free walk-out checkout without physical wallets.',
    tags: ['BLE 5.3', 'AWS Cognito', 'Tokenized Payment', 'Apple Pay / Google Wallet']
  },
  {
    phase: 'Phase 03',
    status: 'H2 2026',
    statusColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    title: 'AWS SageMaker Predictive Replenishment',
    description: 'Training deep recurrent time-series models in Amazon SageMaker using edge dwell times and pick rates to dispatch automated restocking alerts to store clerks before shelves empty.',
    tags: ['Amazon SageMaker', 'DeepAR Forecasting', 'Automated Restock', 'Computer Vision Audits']
  }
];
