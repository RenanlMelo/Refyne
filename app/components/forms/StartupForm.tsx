import React from "react";
import { Building2, Tag, Rocket, Calendar, Users, Globe, IdCard, AlignLeft, Link } from "lucide-react";
import { InputField } from "./InputField";
import { FileUpload } from "./FileUpload";
import { SubmitButton } from "./SubmitButton";
import styles from "./StartupForm.module.scss";

interface StartupFormProps {
  state: any;
  actions: any;
}

export const StartupForm: React.FC<StartupFormProps> = ({ state, actions }) => {
  return (
    <form onSubmit={actions.handleSubmit}>
      <div className={styles.formGrid}>
        {/* Column 1: Company Identity */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>
            Company Identity
          </h3>
          <InputField
            label="Company Name"
            icon={Building2}
            value={state.companyName}
            onChange={actions.setCompanyName}
            placeholder="Your Startup Name"
            required={true}
          />
          <InputField
            label="CNPJ"
            icon={IdCard}
            value={state.cnpj}
            onChange={actions.setCnpj}
            placeholder="00.000.000/0000-00"
            format="##.###.###/####-##"
            required={true}
          />
          <InputField
            label="Description"
            icon={AlignLeft}
            as="textarea"
            row={5}
            className={styles.resizeNone}
            value={state.description}
            onChange={actions.setDescription}
            placeholder="Tell us about your startup's mission and vision..."
          />
        </div>

        {/* Column 2: Operations & Location */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>
            Operations
          </h3>
          <InputField
            label="Industry"
            icon={Tag}
            value={state.industry}
            onChange={actions.setIndustry}
            placeholder="e.g. Fintech, Edtech, Healthtech"
          />

          <div className={styles.twoColGrid}>
            <InputField
              label="Stage"
              as="select"
              value={state.stage}
              onChange={actions.setStage}
            >
              <option value="">Select Stage</option>
              <option value="IDEA">Idea</option>
              <option value="MVP">MVP</option>
              <option value="EARLY_STAGE">Early Stage</option>
              <option value="SEED">Seed</option>
              <option value="SERIES_A">Series A+</option>
            </InputField>

            <InputField
              label="Size"
              as="select"
              value={state.size}
              onChange={actions.setSize}
            >
              <option value="">Select Size</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="200+">200+</option>
            </InputField>
          </div>

          <InputField
            label="Founded Date"
            icon={Calendar}
            type="date"
            value={state.foundedDate}
            onChange={actions.setFoundedDate}
          />

          <div className={styles.twoColGrid}>
            <InputField
              label="City"
              value={state.city}
              onChange={actions.setCity}
              placeholder="City"
            />
            <InputField
              label="State"
              value={state.addressState}
              onChange={actions.setAddressState}
              placeholder="State/UF"
            />
          </div>
          <InputField
            label="Country"
            value={state.country}
            onChange={actions.setCountry}
            placeholder="Country"
          />
        </div>

        {/* Column 3: Media & Social */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>
            Media & Social
          </h3>
          <FileUpload
            label="Company Logo"
            selectedFile={state.logoFile}
            onFileSelect={actions.setLogoFile}
            maxSizeMB={5}
          />
          <InputField
            label="Website"
            icon={Globe}
            value={state.websiteUrl}
            onChange={actions.setWebsiteUrl}
            placeholder="https://..."
          />
          <InputField
            label="LinkedIn"
            icon={Link}
            value={state.linkedinUrl}
            onChange={actions.setLinkedinUrl}
            placeholder="linkedin.com/company/..."
          />
        </div>
      </div>

      <div className={styles.submitWrapper}>
        <SubmitButton loading={state.loading} text="Finish Registration" />
      </div>
    </form>
  );
};
