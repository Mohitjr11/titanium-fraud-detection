import { useState, useRef, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Upload, FileSpreadsheet, AlertTriangle, CheckCircle, ShieldAlert, Filter, CreditCard, MapPin, Clock, User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Transaction {
  transaction_id: string;
  customer_id: string;
  merchant_id: string;
  amount: string;
  transaction_time: string;
  is_fraudulent: string;
  card_type: string;
  location: string;
  purchase_category: string;
  customer_age: string;
  transaction_description: string;
}

const CsvFraudAnalyzer = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzeProgress, setAnalyzeProgress] = useState(0);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterCardType, setFilterCardType] = useState<string>("all");
  const [showOnlyFraud, setShowOnlyFraud] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseCSV = (text: string): Transaction[] => {
    const lines = text.trim().split("\n");
    const headers = lines[0].split(",");
    return lines.slice(1).map((line) => {
      const values = line.split(",");
      const obj: any = {};
      headers.forEach((h, i) => {
        obj[h.trim()] = values[i]?.trim() || "";
      });
      return obj as Transaction;
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    setAnalyzeProgress(0);

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      const parsed = parseCSV(text);

      // Simulate AI analysis progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setTransactions(parsed);
          setIsAnalyzing(false);
        }
        setAnalyzeProgress(Math.min(progress, 100));
      }, 200);
    };
    reader.readAsText(file);
  };

  const loadSampleData = async () => {
    setIsAnalyzing(true);
    setAnalyzeProgress(0);
    try {
      const res = await fetch("/data/synthetic_financial_data.csv");
      const text = await res.text();
      const parsed = parseCSV(text);

      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 15 + 5;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setTransactions(parsed);
          setIsAnalyzing(false);
        }
        setAnalyzeProgress(Math.min(progress, 100));
      }, 200);
    } catch {
      setIsAnalyzing(false);
    }
  };

  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      if (showOnlyFraud && t.is_fraudulent !== "1") return false;
      if (filterCategory !== "all" && t.purchase_category !== filterCategory) return false;
      if (filterCardType !== "all" && t.card_type !== filterCardType) return false;
      return true;
    });
  }, [transactions, showOnlyFraud, filterCategory, filterCardType]);

  const stats = useMemo(() => {
    if (!transactions.length) return null;
    const total = transactions.length;
    const fraudulent = transactions.filter((t) => t.is_fraudulent === "1").length;
    const totalAmount = transactions.reduce((s, t) => s + parseFloat(t.amount || "0"), 0);
    const fraudAmount = transactions.filter((t) => t.is_fraudulent === "1").reduce((s, t) => s + parseFloat(t.amount || "0"), 0);
    const categories = [...new Set(transactions.filter((t) => t.is_fraudulent === "1").map((t) => t.purchase_category))];
    const cardTypes = [...new Set(transactions.filter((t) => t.is_fraudulent === "1").map((t) => t.card_type))];
    return { total, fraudulent, legitimate: total - fraudulent, totalAmount, fraudAmount, categories, cardTypes, fraudRate: ((fraudulent / total) * 100).toFixed(1) };
  }, [transactions]);

  const allCategories = useMemo(() => [...new Set(transactions.map((t) => t.purchase_category))], [transactions]);
  const allCardTypes = useMemo(() => [...new Set(transactions.map((t) => t.card_type))], [transactions]);

  if (!transactions.length) {
    return (
      <Card className="glass border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileSpreadsheet className="h-5 w-5 text-primary" />
            <span>CSV Transaction Analysis</span>
          </CardTitle>
          <CardDescription>Upload a CSV file with transaction data to detect fraudulent activities using AI</CardDescription>
        </CardHeader>
        <CardContent>
          {isAnalyzing ? (
            <div className="space-y-4 py-8">
              <div className="flex items-center justify-center">
                <ShieldAlert className="h-12 w-12 text-primary animate-pulse" />
              </div>
              <h3 className="text-center text-lg font-semibold">AI Analyzing Transactions...</h3>
              <p className="text-center text-sm text-muted-foreground">Running fraud detection models on uploaded data</p>
              <Progress value={analyzeProgress} className="h-2" />
              <p className="text-center text-xs text-muted-foreground">{Math.round(analyzeProgress)}% complete</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div
                className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center cursor-pointer hover:border-primary/60 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload Transaction CSV</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  CSV should contain columns: transaction_id, customer_id, amount, is_fraudulent, card_type, location, purchase_category, etc.
                </p>
                <Button variant="outline">Choose CSV File</Button>
                <Input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
              </div>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Or try with sample data</p>
                <Button variant="hero" onClick={loadSampleData}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Load Sample Dataset (10,000 transactions)
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="glass border-primary/20">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{stats.total.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Transactions</p>
            </CardContent>
          </Card>
          <Card className="glass border-destructive/30">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-destructive">{stats.fraudulent.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Fraudulent ({stats.fraudRate}%)</p>
            </CardContent>
          </Card>
          <Card className="glass border-success/30">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-success">{stats.legitimate.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Legitimate</p>
            </CardContent>
          </Card>
          <Card className="glass border-warning/30">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-warning">${stats.fraudAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              <p className="text-xs text-muted-foreground">Fraud Amount</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filters */}
      <Card className="glass border-primary/20">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <Button
              variant={showOnlyFraud ? "default" : "outline"}
              size="sm"
              onClick={() => setShowOnlyFraud(!showOnlyFraud)}
            >
              <AlertTriangle className="mr-1 h-3 w-3" />
              {showOnlyFraud ? "Showing Fraud Only" : "Showing All"}
            </Button>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[160px] h-9 glass border-primary/20">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {allCategories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterCardType} onValueChange={setFilterCardType}>
              <SelectTrigger className="w-[160px] h-9 glass border-primary/20">
                <SelectValue placeholder="Card Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cards</SelectItem>
                {allCardTypes.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" onClick={() => { setTransactions([]); setFilterCategory("all"); setFilterCardType("all"); }}>
              Upload New File
            </Button>
            <span className="text-xs text-muted-foreground ml-auto">{filteredTransactions.length} results</span>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="glass border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-destructive" />
            {showOnlyFraud ? "Fraudulent Transactions Detected" : "All Transactions"}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            <Table>
              <TableHeader>
                <TableRow className="border-primary/10">
                  <TableHead className="w-[60px]">ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Card</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.slice(0, 200).map((t) => (
                  <TableRow key={t.transaction_id} className={t.is_fraudulent === "1" ? "bg-destructive/5 border-destructive/10" : "border-primary/5"}>
                    <TableCell className="font-mono text-xs">#{t.transaction_id}</TableCell>
                    <TableCell>
                      {t.is_fraudulent === "1" ? (
                        <Badge variant="destructive" className="text-[10px]">
                          <AlertTriangle className="mr-1 h-3 w-3" />Fraud
                        </Badge>
                      ) : (
                        <Badge className="bg-success/20 text-success border-success/30 text-[10px]">
                          <CheckCircle className="mr-1 h-3 w-3" />Safe
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="font-semibold">${parseFloat(t.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1 text-xs">
                        <CreditCard className="h-3 w-3 text-muted-foreground" />
                        {t.card_type}
                      </span>
                    </TableCell>
                    <TableCell className="text-xs">{t.purchase_category}</TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1 text-xs">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {t.location}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1 text-xs">
                        <User className="h-3 w-3 text-muted-foreground" />
                        {t.customer_id} (Age: {t.customer_age})
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {t.transaction_time?.split(" ")[1] || t.transaction_time}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredTransactions.length > 200 && (
              <p className="text-center text-xs text-muted-foreground py-3">Showing first 200 of {filteredTransactions.length} results</p>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default CsvFraudAnalyzer;
